import { Telegraf } from "telegraf";
import logger from "../util/log";
import registerActions from "./actions";

let tgBot: Telegraf | null = null;

/** Create Telegraf bot instance */
export function setup(env: NodeJS.ProcessEnv) {
  const bot = new Telegraf(env.BOT_TOKEN);

  registerActions(bot);
  logger.info("Telegraf bot initialized");

  tgBot = bot;
  return bot;
}

export function get() {
  if (!tgBot) throw new Error("Bot is not initialized");
  return tgBot;
}
