/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 22:34:28
 * @LastEditTime: 2023-03-22 22:42:06
 */

import { MONGO_DB_URI } from '../config';
import { logger } from './logger';
import mongoose from 'mongoose';

class MongodbClient {
    private static instance: MongodbClient;
    private client: mongoose.Connection | null = null;
    public status: boolean = false;

    private constructor(url: string) {

        this.connect(url);

        this.client?.on('open', () => {
            this.status = true;
            logger.info('MongoDB connected ' + url);
        });

        this.client?.on('error', (err: any) => {
            this.status = false;
            logger.error('MongoDB error ' + err.message);
        });

        process.on('exit', this.close)
    }

    public static getInstance(url: string) {
        if (!this.instance) {
            this.instance = new MongodbClient(url);
        }
        return this.instance;
    }

    public connect(url: string) {
        if (!this.status) {
            this.client = mongoose.createConnection(url);
        }
        return this.client;
    }

    public model(name: string, schema: mongoose.Schema) {
        return this.client?.model(name, schema);
    }

    // 关闭数据库
    public async close() {
        await this.client?.close();
    }
}

const client = () => MongodbClient.getInstance(MONGO_DB_URI);

export { client, MongodbClient }

export default client