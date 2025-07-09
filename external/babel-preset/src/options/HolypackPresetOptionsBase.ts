import type { Optional } from "@holypack/core/lib/object/Optional";
import type { ModuleFormat } from "@holypack/integration-babel/build/module/format/ModuleFormat";

export type HolypackPresetOptionsBase = {
  format?: Optional<ModuleFormat>;
};
