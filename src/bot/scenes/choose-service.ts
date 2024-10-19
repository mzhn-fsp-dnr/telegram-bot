import { Scenes } from "telegraf";
import { button, inlineKeyboard } from "telegraf/markup";
import { all, Category } from "../../api/services";
import { _ } from "../../locale";
import { printStartMessage } from "../actions/base";
import { NAME as ChooseDayScene } from "./choose-day";

export const NAME = "choose-service";
const scene = new Scenes.BaseScene(NAME);
const regex = new RegExp(/.*/);

function buildKeyboardFor(categories: Category[], add_back: boolean = false) {
  const buttons = categories.map((s) => [
    button.callback(s.name, `cat_${s.id}`),
  ]);
  if (add_back) buttons.push([button.callback("Назад", "cat_back")]);
  return inlineKeyboard(buttons);
}

scene.command(["start", "cancel"], (ctx) => {
  // @ts-ignore
  delete ctx.session.parent;
  // @ts-ignore
  delete ctx.session.org;

  printStartMessage(ctx);
  // @ts-ignore
  return ctx.scene.leave();
});

scene.enter(async (ctx) => {
  const services = await all();
  const keyboard = buildKeyboardFor(services);

  // @ts-ignore
  ctx.session.parent = [];

  ctx.editMessageText(_("message_choose_service", { category: "" }), {
    reply_markup: keyboard.reply_markup,
  });
});

scene.action(regex, async (ctx) => {
  if (!ctx.match[0].startsWith("cat")) return;
  const parentId = ctx.match[0].split("_")[1];
  ctx.answerCbQuery();

  if (parentId === "back") {
    // @ts-ignore
    ctx.session.parent.pop();
  } else {
    // @ts-ignore
    ctx.session.parent.push(parentId);
  }

  // @ts-ignore
  const category = ctx.session.parent;

  const services = await all();
  let arr = services;
  let service: Category;

  for (let i = 0; i < category.length; i++) {
    service = arr.find((s) => s.id == category[i]);
    arr = service.children;
  }

  if (service?.children.length == 0) {
    // @ts-ignore
    ctx.session.service = service.id;
    //@ts-ignore
    return ctx.scene.enter(ChooseDayScene);
  }

  const keyboard = buildKeyboardFor(
    service?.children ?? arr,
    // @ts-ignore
    ctx.session.parent.length > 0
  );
  ctx.editMessageText(
    _("message_choose_service", { category: service?.name ?? "" }),
    { reply_markup: keyboard.reply_markup }
  );
});

export default scene;
