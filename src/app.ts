import "dotenv/config";
import * as bot from "./bot";
import logger from "./util/log";

logger.info("Init phase start");

const env = process.env;
const tgBot = bot.setup(env);
logger.info("Init phase end");

tgBot.launch();
