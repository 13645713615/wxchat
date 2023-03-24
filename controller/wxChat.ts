/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 18:52:25
 * @LastEditTime: 2023-03-25 00:39:19
 */
import type { Context } from "koa";
import { toSignature, toTextMessage } from "../utils/wxChat";
import type { WxContextQuery, WxMessage } from "../utils/wxChat";
import logger from "../utils/logger";
import rowBody from "raw-body"
import {  parseXML, pollPromise } from "../utils/tools";
import { getSessionOrCreate, answerSession, getAnswerSession } from "../service/session";
import { ERROR_REPLY, INTRODUCE_REPLY } from "../config";
import { eventMessage, textMessage, voiceMessage } from "../service/message";


// 处理接收微信服务器发来的消息
export const receiveMessage = async (ctx: Context) => {

    if (checkSignature(ctx) === false) return;

    const xml = await rowBody(ctx.req, {
        length: ctx.request.length,
        limit: '1mb',
        encoding: ctx.request.charset || 'utf-8'
    })

    const message = await parseXML<WxMessage>(xml);

    const { ToUserName, FromUserName } = message;

    try {
        // 获取话题
        const session = await getSessionOrCreate(message);

        if (session === true) {
            // 话题不存在，创建一个话题
            switch (message.MsgType) {
                case "text":
                    return answerSession(message, await textMessage(message));
                case "voice":
                    return answerSession(message, await voiceMessage(message));
                case "event":
                    return await eventMessage(message);
                default:
                    return toTextMessage({ ToUserName, FromUserName, Content: INTRODUCE_REPLY });
            }
        } else if (session) {
            // 话题已经完成，返回内容
            return session
        } else {
            // 话题存在，没有回答，轮训查找
            // await delay(5000)
            const { result } = await pollPromise(async () => {
                const result = await getAnswerSession(message)
                if (!result) throw new Error("尝试再次获取话题");
                return result
            }, { sleep: 800, timeout: 1000, count: 7, endTime: 5000 })

            if (result) return result;
        }
    } catch (error: any) {

        logger.error(error.message);

        return toTextMessage({ ToUserName, FromUserName, Content: ERROR_REPLY });
    }
}


// 验证消息的确来自微信服务器
export const checkSignature = (ctx: Context) => {
    const { signature, timestamp, nonce, echostr } = ctx.query as unknown as WxContextQuery
    //验证消息的确来自微信服务器
    if (signature === toSignature(timestamp, nonce)) {
        return echostr as string
    } else {
        logger("微信服务器验证失败！")
        ctx.status = 403;
        return false
    }
}