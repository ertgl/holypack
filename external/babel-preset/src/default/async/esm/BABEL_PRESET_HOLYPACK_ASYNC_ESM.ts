import { MODULE_FORMAT_ESM } from "@holypack/integration-babel/build/module/format/MODULE_FORMAT_ESM";

import { createHolypackPresetAsync } from "../../../preset/createHolypackPresetAsync";

const preset = await createHolypackPresetAsync({
  format: MODULE_FORMAT_ESM,
});

export const BABEL_PRESET_HOLYPACK_ASYNC_ESM = preset.value;
