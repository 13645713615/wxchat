/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-23 02:53:26
 * @LastEditTime: 2023-03-23 03:09:47
 */
import type { Context, Next } from "koa"

export default async (ctx: Context, next: Next) => {
    try {
        const result = await next();
        ctx.body = result;
        return result
    } catch (err: any) {
        ctx.status = 500;
        ctx.body = err.message
        ctx.throw = err.message
    }

};