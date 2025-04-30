import {
  createHolypackPreset,
  type HolypackPreset,
} from "./preset";

// TODO(ertgl): Consider enabling the option `isolatedDeclarations` in the base `tsconfig` file.
// Type annotation here is required for importing the external `ConfigGlobals`
// type. Maybe we should consider enabling isolated declaration files, so
// narrowing types become mandatory for all files, which results to a more
// strict type checking, and eliminating hidden errors with the external types.
export const JEST_PRESET_HOLYPACK: HolypackPreset = await createHolypackPreset();
