import { yarn } from "../../lib/yarn/yarn.mjs";

yarn(
  "Running tests...",
  "w:foreach::parallel::topological run test",
);
