import "dotenv/config";
import * as bot from "./bot";
import logger from "./util/log";

logger.info("Init phase start");

const env = process.env;
const tgBot = bot.setup(env);
logger.info("Init phase end");

// Enable graceful stop
process.once("SIGINT", () => tgBot.stop("SIGINT"));
process.once("SIGTERM", () => tgBot.stop("SIGTERM"));

tgBot.launch();
