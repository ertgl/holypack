import { MODULE_FORMAT_ESM } from "@holypack/integration-babel/compilation/MODULE_FORMAT_ESM";

import { createHolypackPresetSync } from "../../../preset/createHolypackPresetSync";

const preset = createHolypackPresetSync({
  format: MODULE_FORMAT_ESM,
});

export const BABEL_PRESET_HOLYPACK_SYNC_ESM = preset.value;
