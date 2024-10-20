import moment from "moment";
import { Scenes } from "telegraf";
import { _ } from "../../locale";
import { printStartMessage } from "../actions/base";
import { NAME as ChooseTimeScene } from "./choose-time";

export const NAME = "choose-day";
const scene = new Scenes.BaseScene(NAME);

function isValidDate(dateString) {
  const date = moment(dateString, "DD.MM.YYYY", true);
  const yesterday = moment().subtract(1, "days");
  const futureLimit = moment().add(14, "days");
  return (
    date.isValid() && date.isAfter(yesterday) && date.isBefore(futureLimit)
  );
}

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
  const text = _("message_choose_date");
  ctx.editMessageText(text);
});

scene.on("message", (ctx) => {
  const msg = ctx.text;
  const isValid = isValidDate(msg);

  if (!isValid) {
    ctx.reply(_("message_invalid_date"));
    return;
  }

  // @ts-ignore
  ctx.session.date = msg;
  //@ts-ignore
  return ctx.scene.enter(ChooseTimeScene);
});

export default scene;
