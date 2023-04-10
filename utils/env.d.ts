/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-28 15:54:18
 * @LastEditTime: 2023-04-07 18:12:06
 */
export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // 判断是在pm2中运行
            PM2_HOME?: string;
            APP_PORT?: string;
            TOKEN:?string;
            APPID:?string;
            APPSECRET:?string;
            LOG4JS_LOGPATH:?string;
            GPT_API_KEY:?string;
            GPT_ORG_ID:?string;
            GPT_MODEL:?string;
            GPT_URL:?string;
            MONGO_DB_URI:?string;
            REDIS_HOST:?string;
            REDIS_PORT:?string;
            REDIS_PASSWORD:?string;
            COMMON_USER_USE_COUNT:?string;
            VIP_USER_USE_COUNT:?string;
            BAIDU_APP_ID:?string;
            BAIDU_API_KEY:?string;
            BAIDU_SECRET_KEY:?string;
        }
    }
}