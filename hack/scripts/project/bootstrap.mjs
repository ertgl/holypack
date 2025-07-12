import { yarn } from "../../lib/yarn/yarn.mjs";

yarn(
  "Bootstrapping...",
  "w:foreach::parallel::topological run bootstrap",
);
