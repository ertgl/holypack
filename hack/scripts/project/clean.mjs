import { yarn } from "../../lib/yarn/yarn.mjs";

yarn(
  "Cleaning...",
  "w:foreach::parallel::interlaced run clean",
);
