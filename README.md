# 口语训练 公众号

koa2 + ioredis + mongoose + typescript

### 数据库
   - mongodb
   - redis
### SDK
   - openai GPT
   - 百度云语音合成
### 请求
   - axios
   - fetch

## 使用
   1. 运行 `pnpm install` 安装依赖.
   2. 在根目录中创建一个 .env 文件并粘贴以下内容：

   ```
      APP_PORT=
      TOKEN=
      APPID=
      APPSECRET=
      GPT_API_KEY=
      GPT_ORG_ID=
      GPT_MODEL=
      GPT_URL=
      MONGO_DB_URI=
      REDIS_HOST=
      REDIS_PORT=
      REDIS_PASSWORD=
      COMMON_USER_USE_COUNT=
      VIP_USER_USE_COUNT=
      BAIDU_APP_ID=
      BAIDU_API_KEY=
      BAIDU_SECRET_KEY=
   ```

   - **`APP_PORT`** 服务器将运行的端口
   - **`TOKEN`** 微信公众号token
   - **`APPID`** 微信公众号appid
   - **`APPSECRET`** 微信公众号appsecret
   - **`GPT_API_KEY`** ChatGpt key
   - **`GPT_ORG_ID`** ChatGpt 组织
   - **`GPT_MODEL`** ChatGpt 模型
   - **`GPT_URL`** openAi api 地址，不填默认https://api.openai.com
   - **`MONGO_DB_URI`** 数据库地址
   - **`REDIS_HOST`** redis 地址
   - **`REDIS_PORT`** redis 端口
   - **`REDIS_PASSWORD`** redis 密码
   - **`COMMON_USER_USE_COUNT`** 普通用户默认使用次数，默认20
   - **`VIP_USER_USE_COUNT`** VIP用户默认使用次数，默认100
   - **`BAIDU_APP_ID`** 百度APPID
   - **`BAIDU_API_KEY`** 百度API_KEY
   - **`BAIDU_SECRET_KEY`** 百度SECRET_KEY
