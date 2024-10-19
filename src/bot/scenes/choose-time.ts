import moment from "moment";
import { Scenes } from "telegraf";
import { button, inlineKeyboard } from "telegraf/markup";
import { create } from "../../api/prereg";
import { all } from "../../api/time";
import { _ } from "../../locale";
import { printStartMessage } from "../actions/base";

export const NAME = "choose-time";
const scene = new Scenes.BaseScene(NAME);
const regex = new RegExp(/.*/);

scene.command(["start", "cancel"], (ctx) => {
  // @ts-ignore
  delete ctx.session.parent;
  // @ts-ignore
  delete ctx.session.org;
  // @ts-ignore
  delete ctx.session.date;
  // @ts-ignore
  delete ctx.session.service;

  printStartMessage(ctx);
  // @ts-ignore
  return ctx.scene.leave();
});

scene.enter(async (ctx) => {
  // @ts-ignore
  const dateRaw = ctx.session.date;
  const date = moment(dateRaw, "DD.MM.YYYY", true);

  const text = _("message_choose_time", { date: dateRaw });
  const timesRaw = await all(date.format("YYYY-MM-DD HH:mm:ss"));
  const times = timesRaw.map((t) => moment(t).format("HH:mm"));
  const buttons = times.map((t) => [button.callback(t, `time_${t}`)]);
  const keyboard = inlineKeyboard(buttons);
  ctx.reply(text, { reply_markup: keyboard.reply_markup });
});

scene.action(regex, async (ctx) => {
  if (!ctx.match[0].startsWith("time")) return;
  ctx.answerCbQuery();

  // @ts-ignore
  const session = ctx.session;

  const service = session.service;
  const org = session.org;
  const dateRaw = session.date;
  const time = ctx.match[0].split("_")[1];

  const [day, month, year] = dateRaw.split(".");
  const formattedDateTime = `${year}-${month}-${day} ${time}:00`;

  const code = await create(org, service, formattedDateTime);
  ctx.reply(_("message_success", { date: dateRaw, time, code }));

  // @ts-ignore
  delete ctx.session.parent;
  // @ts-ignore
  delete ctx.session.org;
  // @ts-ignore
  delete ctx.session.date;
  // @ts-ignore
  delete ctx.session.service;

  // @ts-ignore
  return ctx.scene.leave();
});

export default scene;
