/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-21 18:59:26
 * @LastEditTime: 2023-03-29 01:18:05
 */

import { COMMON_USER_USE_COUNT, VIP_USER_USE_COUNT } from "../config";
import { User, userSchema } from "../moulds/users";
import db from "../utils/db";
import redis from "../utils/redis";
import logger from "../utils/logger";

const dbClient = db();

const redisClient = redis();

const userModel = dbClient.model("users", userSchema);

// 添加用户
export const addUser = async (id: string) => {
    logger.info(`创建新用户: ${id}`);
    return await userModel?.create({
        id,
        level: 0,
        createTime: +new Date(),
        lastUseTime: null,
        levelExpireTime: null,
        accumulateCount: 0,
        useCount: COMMON_USER_USE_COUNT,
        status: 0
    });
}

// 判断用户是否存在, 不存在则添加
export const isUserExist = async (id: string) => {
    const result = await userModel?.findOne({ id })
    if (!result) {
        await addUser(id);
    }
}


// 查询今天用户可使用次数
export const getUserTodayUseCount = async (id: string) => {
    const redis = redisClient.getRedis();
    const key = `user:${id}:todayUseCount`;
    const todayUseCount = await redis.get(key);
    if (todayUseCount) {
        return Number(todayUseCount)
    } else if (todayUseCount === null) {
        return await refreshUserTodayUseCount(id);
    } else {
        return 0;
    }
}

// 刷新今天用户使用次数
export const refreshUserTodayUseCount = async (id: string) => {
    let useCount: number = 0;
    const user = await userModel?.findOne({ id });
    // 判断用户是否封禁
    if (user?.get("status") == 0) {
        useCount = Number(user?.get("useCount") || 0)
    }
    logger.info(`用户: ${id} 今日可使用次数: ${useCount}`);
    const redis = redisClient.getRedis();
    const key = `user:${id}:todayUseCount`;
    await redis.set(key, useCount);
    // 二十四小时后刷新
    await redis.expire(key, 86400);
    return useCount
}

//  消费今天使用次数
export const consumeUserTodayUseCount = async (id: string) => {
    const redis = redisClient.getRedis();
    const key = `user:${id}:todayUseCount`;
    return await redis.decr(key);
}

// 更新用户使用次数
export const updateUserUseCount = async (id: string) => {
    await userModel?.findOneAndUpdate({ id }, {
        $inc: { useCount: -1, accumulateCount: 1 },
        $set: { lastUseTime: Date.now() }
    })
}

// 修改用户身份
export const updateUserLevel = async (id: string, level: number, time: number) => {
    const $set = { level, levelExpireTime: -1, useCount: COMMON_USER_USE_COUNT } as User;
    if (level === 1) {
        $set.levelExpireTime = Date.now() + time;
        $set.useCount = VIP_USER_USE_COUNT;
    }
    await userModel?.findOneAndUpdate({ id }, { $set })
}

