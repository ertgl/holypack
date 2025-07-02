import type { BabelBuild } from "./BabelBuild";
import type { BabelEnv } from "./BabelEnv";

export type BabelContext = {
  build: BabelBuild;
  env: BabelEnv;
};
