/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-21 19:02:03
 * @LastEditTime: 2023-03-23 13:45:55
 */
import { Schema } from 'mongoose';

// 用户类型
export interface User {
    id: string;
    // 身份
    level: number;
    // 身份过期时间
    levelExpireTime?: number;
    // 创建时间
    createTime: number;
    // 最后使用时间
    lastUseTime?: number;
    // 积累使用次数
    accumulateCount: number;
    // 使用剩下次数
    useCount: number;
    // 用户状态
    status: number;
}

// 用户模型
export const userSchema = new Schema<User>({
    id: String,
    level: Number,
    createTime: Number,
    lastUseTime: Number,
    useCount: Number,
    accumulateCount: Number,
    status: Number,
    levelExpireTime: Number
});