/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-23 00:48:10
 * @LastEditTime: 2023-03-31 18:48:08
 */

import { ChatCompletionRequestMessage, Configuration, ConfigurationParameters, CreateChatCompletionRequest, OpenAIApi } from "openai"
import { GPT_API_KEY, GPT_MODEL, GPT_ORG_ID, GPT_URL } from "../config";
import { logger } from "./logger";
import { asyncPrintTime, retry } from "./tools";

// role 类型
export type Role = 'system' | 'user' | 'assistant';

// messages 类型
export interface Message {
    content: string;
    time?: number;
    role: Role;
}

// 交谈类
export class ChatClient {

    private static instance: ChatClient;

    private client: OpenAIApi;

    private constructor(config: ConfigurationParameters, ur?: string) {

        const configuration = new Configuration(config);

        this.client = new OpenAIApi(configuration, ur);
    }

    public static getInstance(config: ConfigurationParameters, ur?: string) {
        if (!this.instance) {
            this.instance = new ChatClient(config, ur);
        }
        return this.instance;
    }

    // 创建消息
    public async create(options: CreateChatCompletionRequest) {
        try {
            const { model = 'gpt-3.5-turbo', messages, ...args } = options;

            const completions = await this.client.createChatCompletion({ ...args, model, messages: messages.map<ChatCompletionRequestMessage>((item: Message) => ({ role: item.role, content: item.content.replace(/^[\n]+|[\n]+$/g, '') })) })

            return completions.data.choices[0].message?.content?.replace(/^[\n]+|[\n]+$/g, '');
        } catch (error: any) {

            logger.error("创建消息失败：" + error.message)

            throw new Error(error.message);
        }
    }
}


// 交谈
export const exchange = async (messages: Message[]): Promise<[string, Message[]]> => {

    const chat = ChatClient.getInstance({ organization: GPT_ORG_ID, apiKey: GPT_API_KEY, }, GPT_URL);

    const reply = await asyncPrintTime(retry(() => chat.create({ messages, model: GPT_MODEL, temperature: 0.5, max_tokens: 400 }), 2, 13000, 0), "创建消息")

    if (!reply) {
        throw new Error("没有回复");
    }

    return [reply, [{ role: "assistant", time: Date.now(), content: reply }, messages.at(-1) as Message]];
}

export default exchange; 