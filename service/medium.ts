/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-23 02:13:41
 * @LastEditTime: 2023-03-30 02:49:49
 */
import { speech } from "baidu-aip-sdk-ts"
import FormData from "form-data";
import axios from "axios"
import { BAIDU_API_KEY, BAIDU_APP_ID, BAIDU_SECRET_KEY } from "../config";
import { getAccessToken } from "./accessToken";
import redisClient from '../utils/redis';
import day from "dayjs";
import schedule from "node-schedule"
import logger from "../utils/logger";

const client = redisClient();

const baiduClient = new speech(BAIDU_APP_ID, BAIDU_API_KEY, BAIDU_SECRET_KEY)

// 上传语音到微信素材库
export const uploadVoice = async (content: string): Promise<string> => {

    // 语音合成
    const result = await baiduClient.text2audio(content, { spd: 4, per: 4 })
    if (result.err_no) {
        throw new Error(`语音合成失败: ${result.err_msg}`)
    }

    // 语音转码
    const form = new FormData()
    form.append("media", result.data, { filename: "voice.mp3", contentType: "audio/mpeg" });

    const url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${await getAccessToken()}&type=voice`;

    // 上传语音
    const { data } = await axios.post(url, form, { headers: form.getHeaders() })
    if (data.errcode) {
        throw new Error(`语音上传失败: ${data.errmsg}`)
    }

    return data.media_id;
}


// 把素材保存在redis中，零时保存
export const saveMaterial = async (mediaId: string) => {
    const redis = client.getRedis();
    const time = day().add(10, "minute")
    const key = `material:${day(time.format("YYYY-MM-DD HH:mm")).unix()}`
    await redis.sadd(key, mediaId);
}


// 清除一个小时之前的素材
export const clearMaterial = async () => {
    const redis = client.getRedis();
    const time = day();
    const key = `material:${day(time.format("YYYY-MM-DD HH:mm")).unix()}`
    const mediaIds = await redis.smembers(key);
    clearAll(mediaIds);
}


// 批量删除素材
export const clearAll = (mediaIds: string[]) => {

    if (mediaIds.length === 0) return;

    Promise.all(mediaIds.map((mediaId) => deleteVoice(mediaId))).then(() => {
        logger.info("素材清理成功:" + mediaIds.length)
    }).catch((error) => {
        logger.error(error.message)
    })
}

// 删除微信素材库中的语音
export const deleteVoice = async (mediaId: string) => {

    const url = `https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=${await getAccessToken()}`;

    const { data } = await axios.post(url, { media_id: mediaId })
    if (data.errcode) {
        throw new Error(`语音删除失败: ${data.errmsg}`)
    }
}