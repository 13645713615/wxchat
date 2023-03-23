/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-23 02:15:04
 * @LastEditTime: 2023-03-23 03:36:50
 */
import { APPID, APPSECRET } from "../config";
import { logger } from "../utils/logger";
import redisClient from "../utils/redis";

// 公众平台返回的对象
interface AccessTokenCache {
    access_token: string;
    expires_in: number;
}


export class AccessToken {

    public accessTokenCache: AccessTokenCache = {
        access_token: '',
        expires_in: 0
    };

    private static instance: AccessToken;

    private static client = redisClient();

    private constructor() { }

    public static async getInstance() {
        if (!this.instance) {
            this.instance = new AccessToken();
            await this.instance.readAccessToken();
            const isCheck = await this.instance.checkAccessToken();
            if (!isCheck) {
                await this.instance.refreshAccessToken().then(() => this.instance.saveAccessToken())
            }
        }
        return this.instance;
    }

    // 刷新access_token
    public async refreshAccessToken() {

        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

        try {
            const res = await fetch(url).then(res => res.json())
            // 验证微信返回token是否成功
            if (res.errcode) {
                throw new Error(res.errmsg)
            }
            // 缓存token
            this.accessTokenCache.access_token = res.access_token;
            // 缓存过期时间
            this.accessTokenCache.expires_in = Date.now() + (res.expires_in - 200) * 1000;

            logger.debug("微信access_token:" + this.accessTokenCache.access_token)

            return this.accessTokenCache.access_token
        } catch (error: any) {

            logger.error("微信access_token获取失败" + error.message)

            return null
        }
    }
    // 保存access_token
    public async saveAccessToken() {
        const redis = AccessToken.client.getRedis();
        await redis.set("access_token", JSON.stringify(this.accessTokenCache));
        await redis.expire("access_token", this.accessTokenCache.expires_in);
    }

    // 读取access_token
    public async readAccessToken() {
        const redis = AccessToken.client.getRedis();
        const res = await redis.get("access_token");
        if (res) {
            this.accessTokenCache = JSON.parse(res);
        }
    }

    // 获取access_token
    public async getAccessToken() {
        // 判断缓存是否过期
        if (this.accessTokenCache.expires_in > Date.now()) {
            return this.accessTokenCache.access_token
        }
        await this.refreshAccessToken();
        this.saveAccessToken();
        return this.accessTokenCache.access_token
    }

    // 验证access_token是否有效
    async checkAccessToken(access_token: string = this.accessTokenCache.access_token) {

        if (!access_token) {
            return false
        }

        const url = `https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=${access_token}`
        try {
            const res = await fetch(url).then(res => res.json())
            if (res.errcode) {
                throw new Error(res.errmsg)
            }
            return true
        } catch (error: any) {
            logger.error("微信access_token验证失败" + error.message)
            return false
        }
    }
}


export const getAccessToken = async () => {
    const instance = await AccessToken.getInstance()
    return instance.getAccessToken()
}