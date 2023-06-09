/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-23 02:13:41
 * @LastEditTime: 2023-03-31 16:46:00
 */
import { speech } from "baidu-aip-sdk-ts"
import FormData from "form-data";
import axios from "axios"
import { BAIDU_API_KEY, BAIDU_APP_ID, BAIDU_SECRET_KEY } from "../config";
import { getAccessToken } from "./accessToken";
import logger from "../utils/logger";

const baiduClient = new speech(BAIDU_APP_ID, BAIDU_API_KEY, BAIDU_SECRET_KEY)


// 上传语音到微信素材库
export const uploadVoice = async (content: string): Promise<string> => {

    const url = `https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${await getAccessToken()}&type=voice`;
    // 语音合成
    const result = await baiduClient.text2audio(content, { spd: 6, per: 4, vol: 10 })
    if (result.err_no) {
        throw new Error(`语音上传失败: ${result.err_msg}`)
    }

    // 语音转码
    const form = new FormData()
    form.append("media", result.data, {
        filename: "voice.mp3",
        contentType: "audio/mpeg"
    });

    // 上传语音
    const { data } = await axios.post(url, form, { headers: form.getHeaders() })
    if (data.errcode) {
        throw new Error(`语音上传失败: ${data.errmsg}`)
    }

    logger.info(`上传语音成功，MediaId: ${data.media_id}`);

    return data.media_id;
}