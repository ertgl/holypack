import { createHolypackPreset } from "../preset";

const holypack = await createHolypackPreset({
  context: {
    overrides: {
      legacy: true,
    },
  },
});

export const BABEL_PRESET_HOLYPACK_LEGACY = holypack.value;
