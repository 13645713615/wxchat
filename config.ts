/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 19:01:28
 * @LastEditTime: 2023-03-24 21:07:47
 */

/**
 * ========微信公众号配置===========
 */

export const TOKEN = 'carroll'

export const APPID = 'wx01f3fc110924d23f'

export const APPSECRET = '7ebe835ad6680bf3d576c2a20ab68079'


/**
 * ========log===========
 */

export const LOG4JS_LOGPATH = 'logs'



/**
 * ========GPT===========
 */

export const GPT_API_KEY = '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'

export const GPT_ORG_ID = 'org-ZfsTvKHDodRCkVMbereUk3nA'

export const GPT_MODEL = 'gpt-3.5-turbo'

export const GPT_URL = 'https://xiugouai.top/v1'


/**
 * ========db===========
 */

export const MONGO_DB_NAME = 'chat'

export const MONGO_DB_URI= 'mongodb://root:Cai1186684149-@dds-bp1925e2958e3fb41534-pub.mongodb.rds.aliyuncs.com:3717,dds-bp1925e2958e3fb42532-pub.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-67055713'


/**
 * ========Redis===========
 */

export const REDIS_HOST = '42.192.71.228'

export const REDIS_PORT = 6379

export const REDIS_PASSWORD = '1186684149'

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
export const COMMON_USER_USE_COUNT = 20;

// VIP用户默认使用次数
export const VIP_USER_USE_COUNT = 100;

/**
 * ========百度===========
 */

// 百度APPID
export const BAIDU_APP_ID = '31519020';

// 百度API_KEY
export const BAIDU_API_KEY = 'dFXxeZHrUSfoT6G2aPXTEtlB';

// 百度SECRET_KEY
export const BAIDU_SECRET_KEY = "7CdPiq9jthyudrqLQE2Um35O1zyGmMjW"


