import { yarn } from "../../lib/yarn/yarn.mjs";

yarn(
  "Preparing...",
  "w:foreach::parallel::topological run prepare",
);
