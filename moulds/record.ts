/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-23 15:41:41
 * @LastEditTime: 2023-03-23 15:44:54
 */
import { Schema } from 'mongoose';
import { RecordMessage } from '../service/record';

// 消息记录模型
export const recordSchema = new Schema<RecordMessage>({
    id: String,
    time: Number,
    role: String,
    content: String,
});