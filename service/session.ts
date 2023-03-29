/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 23:51:50
 * @LastEditTime: 2023-03-30 00:38:56
 */
import { logger } from '../utils/logger';
import redisClient from '../utils/redis';
import type { WxMessage } from '../utils/wxChat';

const client = redisClient();

// 为空的标识
const EMPTY = "EMPTY";

// 创建一个话题
export const createSession = async (message: WxMessage) => {
    const redis = client.getRedis();
    const key = getSessionKey(message);
    await redis.set(key, EMPTY);
    await redis.expire(key, 60);
    logger.debug("创建话题" + key)
}

// 消费一个话题
export const answerSession = (message: WxMessage, content: string) => {
    const redis = client.getRedis();
    const key = getSessionKey(message);
    redis.setex(key, 60, content);
    logger.debug("话题:" + key + "已经完成")
    return content
}

// 判断话题是否已经完成，如果完成返回内容
export const getSession = async (message: WxMessage) => {
    const redis = client.getRedis();
    const key = getSessionKey(message);
    return await redis.get(key);
}

// 获取完成的话题
export const getAnswerSession = async (message: WxMessage) => {
    const content = await getSession(message);
    if (content === null || content === EMPTY) {
        return "";
    }
    return content
}

// 如果话题已经完成，返回内容，如果不存在，创建一个话题
export const getSessionOrCreate = async (message: WxMessage) => {
    const content = await getSession(message);
    if (content === null) {
        createSession(message);
        return true;
    } else if (content === EMPTY) {
        return "";
    }
    return content
}

// 获取话题的key
export const getSessionKey = (message: WxMessage) => {
    return `message:${message.FromUserName}:session:${message.CreateTime}`;
}