import { Scenes } from "telegraf";
import { button, inlineKeyboard } from "telegraf/markup";
import { all } from "../../api/orgs";
import { _ } from "../../locale";
import { printStartMessage } from "../actions/base";
import { NAME as ChooseServiceScene } from "./choose-service";

export const NAME = "choose-org";
const scene = new Scenes.BaseScene(NAME);
const regex = new RegExp(/.*/);

scene.command(["start", "cancel"], (ctx) => {
  // @ts-ignore
  ctx.session.parent = [];
  printStartMessage(ctx);
  // @ts-ignore
  return ctx.scene.leave();
});

scene.enter(async (ctx) => {
  const text = _("message_choose_org");
  const orgs = await all();
  const buttons = orgs.map((o) => [button.callback(o.name, `org_${o.id}`)]);
  const keyboard = inlineKeyboard(buttons);
  ctx.reply(text, { reply_markup: keyboard.reply_markup });
});

scene.action(regex, (ctx) => {
  if (!ctx.match[0].startsWith("org")) return;
  ctx.answerCbQuery();
  const orgId = parseInt(ctx.match[0].split("_")[1], 10);

  //@ts-ignore
  ctx.session.org = orgId;
  //@ts-ignore
  return ctx.scene.enter(ChooseServiceScene);
});

export default scene;
