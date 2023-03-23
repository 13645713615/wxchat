/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-18 22:46:18
 * @LastEditTime: 2023-03-23 03:44:18
 */
import xml2 from "xml2js"
import { logger } from './logger';


// 解析XML的异步函数
export const parseXML = <T>(xml: xml2.convertableToString) => {
    return new Promise<T>((resolve, reject) => {
        xml2.parseString(xml, { trim: true, explicitArray: false, ignoreAttrs: true }, function (err, result) {
            if (err) {
                return reject(err)
            }
            resolve(result.xml)
        })
    })
}


// 打印promise完成时间
export const asyncPrintTime = <T extends any>(promise: Promise<T>, name: string): Promise<T> => {
    const start = Date.now();
    return promise.then((res: any) => {
        logger.debug(`${name}: ${ Date.now() - start}`);
        return res;
    })
}


// 延迟函数
export const delay = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, time);
    })
}