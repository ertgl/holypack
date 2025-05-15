import { castBoolean } from "../../../../lib/process/std";

import { isCI } from "./detector";

const isEnvCI = castBoolean(process.env.CI);

test(
  "detects CI environment",
  () =>
  {
    expect(isCI()).toBe(isEnvCI);
  },
);
