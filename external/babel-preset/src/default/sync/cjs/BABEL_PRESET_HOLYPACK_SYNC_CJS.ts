import { MODULE_FORMAT_CJS } from "@holypack/integration-babel/compilation/MODULE_FORMAT_CJS";

import { createHolypackPresetSync } from "../../../preset/createHolypackPresetSync";

const preset = createHolypackPresetSync({
  format: MODULE_FORMAT_CJS,
});

export const BABEL_PRESET_HOLYPACK_SYNC_CJS = preset.value;
