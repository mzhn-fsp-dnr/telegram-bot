// @ts-nocheck

import { Scenes } from "telegraf";
import chooseDay from "./choose-day";
import chooseOrg from "./choose-org";
import chooseService from "./choose-service";
import chooseTime from "./choose-time";

const stage = new Scenes.Stage([
  chooseOrg,
  chooseService,
  chooseDay,
  chooseTime,
]);
export default stage;
