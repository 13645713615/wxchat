/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 22:15:14
 * @LastEditTime: 2023-03-23 03:29:19
 */
import { Redis } from "ioredis";
import type { RedisOptions } from "ioredis";
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_DB } from "../config";
import { logger } from "./logger";

// redis连接 class
export class RedisClient {

    private redis: Redis;
    private static instance: RedisClient;

    private constructor(options: RedisOptions) {
        this.redis = new Redis(options);
        logger("redis connected " + options.host + ":" + options.port);
        process.on('exit', this.close)
    }

    public static getInstance(options: RedisOptions) {
        if (!this.instance) {
            this.instance = new RedisClient(options);
        }
        return this.instance;
    }

    // 获取redis连接
    public getRedis() {
        return this.redis;
    }

    // 关闭
    public close() {
        this.redis?.disconnect();
    }
}

export const client = () => RedisClient.getInstance({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    db: REDIS_DB
});

export default client