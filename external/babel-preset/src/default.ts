import { createHolypackPreset } from "./preset";

const holypack = await createHolypackPreset();

export const BABEL_PRESET_HOLYPACK = holypack.value;
