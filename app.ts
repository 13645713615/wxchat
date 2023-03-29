/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 18:32:14
 * @LastEditTime: 2023-03-29 18:08:32
 */
import dotenv from "dotenv"
dotenv.config()
import Koa from "koa";
import Router from "koa-router";
import BodyParser from "koa-bodyparser";
import { checkSignature, receiveMessage } from "./controller/wxChat";
import logger from "./middleware/logger";
import bodyResult from "./middleware/result";
import { APP_PORT } from "./config";
import log from './utils/logger'
import { AccessToken } from "./service/accessToken";

const app = new Koa();
const router = new Router();

router.get("/", checkSignature);

router.post("/", receiveMessage);

app.use(BodyParser())
    .use(logger)
    .use(bodyResult)
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(APP_PORT, () => {
        AccessToken.getInstance()
        log(`Server is running at http://localhost:${APP_PORT}`)
    });