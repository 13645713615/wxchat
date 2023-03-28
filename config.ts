/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 19:01:28
 * @LastEditTime: 2023-03-28 16:07:50
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

export const MONGO_DB_URI = process.env.GPT_URL || "mongodb://localhost:27017/wechat"


/**
 * ========Redis===========
 */

export const REDIS_HOST = process.env.REDIS_HOST

export const REDIS_PORT = process.env.REDIS_PORT || 6379

export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ""

export const REDIS_DB = 0


/**
 * ========chat===========
 */

// 错误回复语
export const ERROR_REPLY = "抱歉服务器维护中，请稍后再试？";

// 无法识别的消息回复语
export const UNRECOGNIZED_REPLY = "你说的我听不懂，你可以换种说法吗？";

// 今日次数已用完回复语
export const USE_COUNT_OVER_REPLY = "你今天的使用次数已用完，明天再来吧~";

// 取消关注回复语
export const UNSUBSCRIBE_REPLY = "再见，期待你的下次使用";

// 介绍回复语
export const INTRODUCE_REPLY = "你可以通过以下方式与我交流：\n1.聊天\n2.翻译";

// 翻译提示语
export const TRANSLATE_REPLY = "你是一个翻译小助手，我说中文你就翻译成英文，我说英文你就翻译成中文";

// 聊天提示语
export const CHAT_REPLY = "你是一个聊天小助手，我说中文你就回复中文，我说英文你就回复英文";


/**
 * ========用户===========
 */

// 普通用户默认使用次数
export const COMMON_USER_USE_COUNT = process.env.COMMON_USER_USE_COUNT || 20;

// VIP用户默认使用次数
export const VIP_USER_USE_COUNT = process.env.VIP_USER_USE_COUNT || 100;

/**
 * ========百度===========
 */

// 百度APPID
export const BAIDU_APP_ID = process.env.BAIDU_APP_ID || '';

// 百度API_KEY
export const BAIDU_API_KEY = process.env.BAIDU_API_KEY || '';

// 百度SECRET_KEY
export const BAIDU_SECRET_KEY = process.env.BAIDU_SECRET_KEY || ""


