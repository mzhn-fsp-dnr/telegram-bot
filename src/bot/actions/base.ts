import { Context } from "telegraf";
import { button, inlineKeyboard } from "telegraf/markup";
import { Update } from "telegraf/types";
import { Action } from ".";
import { _ } from "../../locale";
import { addKey, getById } from "../../service/users";
import { NAME as ChooseOrgScene } from "../scenes/choose-org";

const buttons = [[button.callback("Записаться", "reserve")]];

export function printStartMessage(ctx: Context<Update>) {
  const keyboard = inlineKeyboard(buttons).reply_markup;
  ctx.reply(_("message_welcome"), {
    reply_markup: keyboard,
  });
}

export const baseAction: Action = async (bot) => {
  bot.start(async (ctx) => {
    const userId = ctx.from.id;
    const key = ctx.payload;

    const userEntry = await getById(userId);

    if (userEntry === undefined && key == "") {
      ctx.reply(_("message_not_authorized"));
      return;
    }
    if (userEntry !== undefined) {
      printStartMessage(ctx);
      return;
    }

    await addKey(userId, key);
    printStartMessage(ctx);
  });

  bot.action("reserve", async (ctx) => {
    // @ts-ignore
    ctx.scene.enter(ChooseOrgScene);
    ctx.answerCbQuery();
  });
};
