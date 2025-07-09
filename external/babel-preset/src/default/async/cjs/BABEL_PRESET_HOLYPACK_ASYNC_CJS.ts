import { MODULE_FORMAT_CJS } from "@holypack/integration-babel/build/module/format/MODULE_FORMAT_CJS";

import { createHolypackPresetAsync } from "../../../preset/createHolypackPresetAsync";

const preset = await createHolypackPresetAsync({
  format: MODULE_FORMAT_CJS,
});

export const BABEL_PRESET_HOLYPACK_ASYNC_CJS = preset.value;
