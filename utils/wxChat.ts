/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 19:18:32
 * @LastEditTime: 2023-03-31 17:20:01
 */
import { TOKEN } from '../config';
import sha1 from 'sha1';


// 微信文本消息类型
export interface TextMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: string;
    MsgType: 'text';
    Content: string;
    MsgId: string;
}

// 微信图片消息类型
export interface ImageMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: string;
    MsgType: 'image';
    PicUrl: string;
    MediaId: string;
    MsgId: string;
}

// 微信语音消息类型
export interface VoiceMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: string;
    MsgType: 'voice';
    MediaId: string;
    Format: string;
    MsgId: string;
    Recognition: string;
}

// 微信视频消息类型
export interface VideoMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: string;
    MsgType: 'video';
    MediaId: string;
    ThumbMediaId: string;
    MsgId: string;
}

// 微信小视频消息类型
export interface ShortVideoMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: string;
    MsgType: 'shortvideo';
    MediaId: string;
    ThumbMediaId: string;
    MsgId: string;
}

// 微信地理位置消息类型
export interface LocationMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: string;
    MsgType: 'location';
    Location_X: string;
    Location_Y: string;
    Scale: string;
    Label: string;
    MsgId: string;
}

// 微信链接消息类型
export interface LinkMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: string;
    MsgType: 'link';
    Title: string;
    Description: string;
    Url: string;
    MsgId: string;
}

// 微信事件消息类型
export interface EventMessage {
    ToUserName: string;
    FromUserName: string;
    CreateTime: string;
    MsgType: 'event';
    Event: string;
    EventKey: string;
}

// 微信公众号请求过来的query类型
export interface WxContextQuery {
    signature: string;
    timestamp: string;
    nonce: string;
    echostr: string;
}

// 微信消息类型
export type WxMessage = TextMessage | VoiceMessage |  EventMessage;


// 验证签名
export const toSignature = (timestamp: string, nonce: string): string => {
    // 1. 将token、timestamp、nonce三个参数进行字典序排序
    const arr = [TOKEN, timestamp, nonce];
    // 2. 将三个参数字符串拼接成一个字符串进行sha1加密
    const str = arr.sort().join('');
    const sha1Str = sha1(str);
    // 3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    return sha1Str
}

// 对象属性为可选，指定多个属性为必选
export type PartialBy<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// 微信text xml消息拼接
export const toTextMessage = (message: PartialBy<TextMessage, "FromUserName" | "ToUserName" | "Content">) => {
    return `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${Date.now()}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${message.Content}]]></Content>
    </xml>`
}

// 微信voice xml消息拼接
export const toVoiceMessage = (message: PartialBy<VoiceMessage, "FromUserName" | "ToUserName" | "MediaId">) => {
    return `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${Date.now()}</CreateTime>
    <MsgType><![CDATA[voice]]></MsgType>
    <Voice>
    <MediaId><![CDATA[${message.MediaId}]]></MediaId>
    </Voice>
    </xml>`
}


//  command 枚举
export enum Command {
    Chat = '聊天',
    Translate = '翻译',
    Teacher = '训练',
}