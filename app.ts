/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2023-03-22 18:32:14
 * @LastEditTime: 2023-03-24 21:01:57
 */
import Koa from "koa";
import Router from "koa-router";
import BodyParser from "koa-bodyparser";
import { checkSignature, receiveMessage } from "./controller/wxChat";
import logger from "./middleware/logger";
import bodyResult from "./middleware/result";

const app = new Koa();
const router = new Router();

router.get("/", checkSignature);

router.post("/", receiveMessage);

app.use(BodyParser())
.use(logger)
.use(bodyResult)
.use(router.routes())
.use(router.allowedMethods())
    .listen(80)