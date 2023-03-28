/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 18:32:14
 * @LastEditTime: 2023-03-28 15:58:37
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

const app = new Koa();
const router = new Router();

router.get("/", checkSignature);

router.post("/", receiveMessage);

app.use(BodyParser())
.use(logger)
.use(bodyResult)
.use(router.routes())
.use(router.allowedMethods())
    .listen(APP_PORT)