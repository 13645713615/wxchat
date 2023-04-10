/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 19:01:28
 * @LastEditTime: 2023-03-31 17:18:47
 */


export const APP_PORT = process.env.APP_PORT || 80
/**
 * ========微信公众号配置===========
 */

export const TOKEN = process.env.TOKEN || ""

export const APPID = process.env.APPID || ""

export const APPSECRET = process.env.APPSECRET || ""


/**
 * ========log===========
 */

export const LOG4JS_LOGPATH = process.env.LOG4JS_LOGPATH || 'logs'



/**
 * ========GPT===========
 */

export const GPT_API_KEY = process.env.GPT_API_KEY || ""

export const GPT_ORG_ID = process.env.GPT_ORG_ID || ""

export const GPT_MODEL = process.env.GPT_MODEL || ""

export const GPT_URL = process.env.GPT_URL || ""


/**
 * ========db===========
 */

export const MONGO_DB_URI = process.env.MONGO_DB_URI || "mongodb://localhost:27017/wechat"


/**
 * ========Redis===========
 */

export const REDIS_HOST = process.env.REDIS_HOST || ""

export const REDIS_PORT = Number(process.env.REDIS_PORT || 6379)

export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ""

export const REDIS_DB = 0


/**
 * ========chat===========
 */

// 错误回复语
export const ERROR_REPLY = "抱歉服务器维护中，请稍后再试!";

// 无法识别的消息回复语
export const UNRECOGNIZED_REPLY = "你说的我听不懂，你可以换种说法吗？";

// 今日次数已用完回复语
export const USE_COUNT_OVER_REPLY = "你今天的使用次数已用完，明天再来吧~";

// 取消关注回复语
export const UNSUBSCRIBE_REPLY = "再见，期待你的下次使用";

// 介绍回复语
export const INTRODUCE_REPLY = "你可以通过以下方式与我交流：\n1.聊天\n2.翻译\n3.训练";

// 翻译提示语
export const TRANSLATE_REPLY = "You are a translation assistant. When I speak Chinese, you translate into English. When I speak English, you translate into Chinese";
// 聊天提示语
export const CHAT_REPLY = "You are a chat assistant. If I speak Chinese, you will reply in Chinese. If I speak English, you will reply in English";
// 训练提示语
export const English_Teacher_REPLY = "Hi. I'm a native Chinese speaker. I want you to act as my English teacher to help me improve. I will talk to you in in a mixture of English and Chinese, and you will reply to me in English to practice my English. In your reply, you MUST include a Chinese translation (without phonetic notation) of what you just say. I want you to keep your reply neat, try limiting the reply to within 100 words. I want you to strictly point out and correct my grammar mistakes, typos, and factual errors. You MUST always ask me a question in your reply to continue the conversation. Now let's start practicing, you could ask me a question first.";


/**
 * ========用户===========
 */

// 普通用户默认使用次数
export const COMMON_USER_USE_COUNT = Number(process.env.COMMON_USER_USE_COUNT || 20);

// VIP用户默认使用次数
export const VIP_USER_USE_COUNT = Number(process.env.VIP_USER_USE_COUNT || 100)

/**
 * ========百度===========
 */

// 百度APPID
export const BAIDU_APP_ID = process.env.BAIDU_APP_ID || '';

// 百度API_KEY
export const BAIDU_API_KEY = process.env.BAIDU_API_KEY || '';

// 百度SECRET_KEY
export const BAIDU_SECRET_KEY = process.env.BAIDU_SECRET_KEY || ""


