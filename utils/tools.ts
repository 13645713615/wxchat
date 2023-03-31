/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-18 22:46:18
 * @LastEditTime: 2023-03-31 18:20:08
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
        logger.debug(`${name}: ${Date.now() - start}`);
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


interface PollPromiseOptions<T> {
    // 轮询次数。默认为undefined，即不限制轮询次数。
    count?: number;
    // 单次轮询超时时间，单位为毫秒（ms）。默认为undefined，即不设置超时时间。
    timeout?: number;
    // 每次轮询之间的间隔时间，单位为毫秒（ms）。默认为undefined，即不设置间隔时间。
    sleep?: number;
    // 程序结束时间，单位为毫秒（ms）。默认为undefined，即不设置结束时间。
    endTime?: number;
    // 在每次重试之前执行的回调函数。该回调函数接受两个参数：错误对象和已经尝试的次数。默认为undefined，即不执行回调函数。
    beforeRetry?: (error: Error, retryCount: number) => void;
    // 是否存储每次轮询的结果。默认为false，即不存储结果。
    storeResults?: boolean;
    // 是否使用指数退避策略，即每次重试的等待时间逐步增加。默认为false，即不使用指数退避策略。
    exponentialWait?: boolean;
}

interface PollPromiseResult<T> {
    // 轮询尝试的次数。
    tries: number;
    // 轮询操作的最终结果，如果没有结果则为undefined。
    result?: T;
    // 轮询操作失败的错误对象，如果没有错误则为undefined。
    error?: Error;
    // 存储每次轮询的结果，如果没有存储结果则为undefined。
    results?: T[];
}

export const pollPromise = async <T>(promiseFn: () => Promise<T>, options: PollPromiseOptions<T> = {}): Promise<PollPromiseResult<T>> => {
    const { count = 2, timeout = 2000, sleep = 1000, endTime, beforeRetry, storeResults = false, exponentialWait = false, } = options;

    const start = Date.now();

    let tries = 0;
    let results: T[] = [];
    let error: Error | undefined;

    while (tries < count) {
        try {
            const result = await Promise.race([
                promiseFn(),
                new Promise<unknown>((_, reject) => {
                    setTimeout(() => reject(new Error(`Polling timed out after ${timeout}ms`)), timeout);
                }),
            ]) as T;

            tries++;
            if (storeResults) {
                results.push(result);
            } else {
                results = [];
            }

            return { tries, result, results };
        } catch (e: any) {
            error = e;
            tries++;

            beforeRetry?.(e, tries);

            if (endTime && Date.now() - start > endTime) break;

            if (exponentialWait) {
                await new Promise(resolve => setTimeout(resolve, sleep * tries ** 2));
            } else {
                await new Promise(resolve => setTimeout(resolve, sleep));
            }
        }
    }

    return { tries, error };
};


// 错误重试
export const retry = <T>(promiseFn: () => Promise<T>, count: number, endTime: number = 5000, interval: number = 1000) => Promise.race<[Promise<T | undefined>, Promise<undefined>]>([
    (async () => {
        for (let i = 0; i < count; i++) {
            try {
                return await promiseFn();
            } catch (e: any) {
                logger.error(`请求失败，正在重试...` + e.message);
                await delay(interval);
            }
        }
    })(),
    new Promise<undefined>((resolve) => {
        setTimeout(() => {
            logger.error(`请求超时，重试次数已达上限`);
            resolve(undefined);
        }, endTime);
    })
])
