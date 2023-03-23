/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 19:00:17
 * @LastEditTime: 2023-03-23 03:08:14
 */

import type { Context, Next } from 'koa';
import logger from '../utils/logger';

export default async (ctx: Context, next: Next) => {
    const start = new Date().getTime();
    let result;
    try {
        result = await next();
    } catch (error: any) {
        logger.error(error.message);
    }
    const ms = new Date().getTime() - start;
    logger.info(`URL: ${ctx.URL} - 响应:${ms}ms`)
    return result
}