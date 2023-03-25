/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 22:45:32
 * @LastEditTime: 2023-03-25 16:41:15
 */
import { CHAT_REPLY, INTRODUCE_REPLY, TRANSLATE_REPLY, UNSUBSCRIBE_REPLY, USE_COUNT_OVER_REPLY } from '../config';
import exchange, { Message, Role } from '../utils/chat';
import logger from '../utils/logger';
import { Command, EventMessage, TextMessage, toTextMessage, toVoiceMessage, VoiceMessage, WxMessage } from '../utils/wxChat';
import { uploadVoice } from './medium';
import { deleteRecord, findRecord, saveRecord } from './record';
import { consumeUserTodayUseCount, getUserTodayUseCount, isUserExist, refreshUserTodayUseCount } from "./user";

// 处理微信text消息
export const textMessage = async (message: TextMessage) => {

    const { Content, FromUserName, ToUserName } = message;

    const command = await commandMessage(Content, message);
    if (command) return command;

    const replyContent = await createMessage(FromUserName, Content);

    return toTextMessage({ FromUserName, ToUserName, Content: replyContent });
}

// 处理微信语音消息
export const voiceMessage = async (message: VoiceMessage) => {

    const { Recognition, FromUserName, ToUserName } = message;

    if (Recognition === undefined) {
        throw new Error("语音识别获取不到参数 Recognition");
    }

    const command = await commandMessage(Recognition, message);
    if (command) return command;

    const replyContent = await createMessage(FromUserName, Recognition.replace(/[。]+$/g, ''));

    const MediaId = await uploadVoice(replyContent)

    return toVoiceMessage({ FromUserName, ToUserName, MediaId });
}


// 处理微信事件消息
export const eventMessage = async (message: EventMessage) => {
    const { Event, FromUserName, ToUserName } = message;

    switch (Event) {
        case "subscribe":
            await isUserExist(FromUserName);
            createMessage(FromUserName, CHAT_REPLY, "system");
            logger.info(`用户${FromUserName}订阅成功`);
            return toTextMessage({ FromUserName, ToUserName, Content: INTRODUCE_REPLY });
        case "unsubscribe":
            logger.info(`用户${FromUserName}取消订阅`);
            return toTextMessage({ FromUserName, ToUserName, Content: UNSUBSCRIBE_REPLY });
        default:
            break;
    }
}

// 处理指令消息
export const commandMessage = async (context: string, Message: WxMessage) => {
    const { FromUserName, ToUserName } = Message;
    let replyContent: string;
    switch (context) {
        case "1":
        case Command.Chat:
            replyContent = await createMessage(FromUserName, CHAT_REPLY, "system");
            return toTextMessage({ FromUserName, ToUserName, Content: replyContent });
        case "2":
        case Command.Translate:
            replyContent = await createMessage(FromUserName, TRANSLATE_REPLY, "system");
            return toTextMessage({ FromUserName, ToUserName, Content: replyContent });
        default:
            break;
    }
}

// 创建消息
export const createMessage = async (id: string, message: string, role: Role = "user") => {

    let messages: Message[] = [];
    // 如果是用户则查询消息，如果是系统则删除消息，重新开始
    try {
        if (role === "user") {
            if (await getUserTodayUseCount(id) <= 0) {
                return USE_COUNT_OVER_REPLY;
            }

            messages = await findRecord(id, ({ role, content }) => ({ role, content }))
        } else {
            await deleteRecord(id)
        }
    } catch (error: any) {
        logger.error(error.message)
    }

    messages.push({ role, content: message })

    const [content, newRecord] = await exchange(messages)

    if (role === "user") {
        consumeUserTodayUseCount(id);
    }
    // 插入记录
    saveRecord(id, newRecord);
    
    return content;
}


