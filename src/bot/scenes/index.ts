import { Scenes } from "telegraf";
import chooseOrg from "./choose-org";
import chooseService from "./choose-service";

// @ts-ignore
const stage = new Scenes.Stage([chooseOrg, chooseService]);
export default stage;
