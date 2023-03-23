/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 19:01:12
 * @LastEditTime: 2023-03-22 19:01:13
 */

// log4js
import log4js from 'log4js';
import { LOG4JS_LOGPATH } from '../config';


// log4js 级别类型
type Levels = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'mark';

// log4js 级别数组
const levels: Levels[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];

log4js.configure({
    appenders: {
        console: {
            type: 'console'
        },
        info: {
            type: "dateFile",
            filename: `${LOG4JS_LOGPATH}/logs`,
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        error: {
            type: 'dateFile',
            filename: `${LOG4JS_LOGPATH}/error`,
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'debug'
        },
        info: {
            appenders: ['info', "console"],
            level: "info"
        },
        error: {
            appenders: ['error', "console"],
            level: "error"
        }
    }
})


type ContextLogger = {
    (message: string, level?: Levels): void;
} & Record<Levels, (message: string) => void>;

// 日志输出
//@ts-ignore
const contextLogger: ContextLogger = (message: string, level: Levels = "info") => {
    const loger: log4js.Logger = log4js.getLogger(level);
    loger.level = level;
    loger[level](message);
}

levels.forEach((level: Levels) => {
    contextLogger[level] = (message: string) => contextLogger(message, level)
})


export { ContextLogger, Levels, contextLogger as logger }

export default contextLogger

