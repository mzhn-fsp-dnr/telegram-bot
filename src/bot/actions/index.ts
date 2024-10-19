import { Telegraf } from "telegraf";
import { baseAction } from "./base";

export type Action = (bot: Telegraf) => Promise<void>;

const actions: Action[] = [baseAction];

export default function registerActions(bot: Telegraf) {
  actions.forEach((cb) => cb(bot));
}
