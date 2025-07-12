import { yarn } from "../../lib/yarn/yarn.mjs";

yarn(
  "Building...",
  "w:foreach::parallel::topological run build",
);
