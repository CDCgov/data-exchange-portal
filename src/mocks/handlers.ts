import { mmsHandlers } from "src/mocks/handlers/mmsHandlers";
import { psApiHandlers } from "src/mocks/handlers/psApiHandlers";

export const handlers = [...mmsHandlers, ...psApiHandlers];
