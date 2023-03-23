/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-23 01:48:05
 * @LastEditTime: 2023-03-23 15:47:07
 */
import type { Message } from '../utils/chat';
import redisClient from '../utils/redis';
import db from "../utils/db";
import { recordSchema } from '../moulds/record';

const dbClient = db();

const client = redisClient();

export interface RecordMessage extends Message {
    id: string;
    time: number;
}


const recordModel = dbClient.model("record", recordSchema);


// 查询记录
export const findRecord = async <T>(id: string, format: (value: RecordMessage) => T = (value) => value as any): Promise<T[]> => {
    const redis = client.getRedis();
    const key = `message:${id}`;
    const messages = await redis.lrange(key, 0, -1);
    return messages.map((message) => format(JSON.parse(message)));
}

// 保存记录
export const saveRecord = async (id: string, message: Message | Message[]) => {
    const redis = client.getRedis();
    const key = `message:${id}`;
    const time = Date.now();
    const doc = Array.isArray(message) ? message.map(item => JSON.stringify({ id, time, ...item })) : [JSON.stringify({ id, time, ...message })];
    await redis.lpush(key, ...doc);
}

// 删除记录
export const deleteRecord = async (id: string) => {
    const redis = client.getRedis();
    const key = `message:${id}`;
    await saveRecordToDb(id);
    await redis.del(key);
}

// 保存记录到数据库
export const saveRecordToDb = async (id: string) => {
    const messages = await findRecord(id);
    await recordModel?.insertMany(messages);
}