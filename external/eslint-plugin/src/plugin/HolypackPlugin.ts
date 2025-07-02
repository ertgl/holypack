import type {
  ESLint,
  Linter,
} from "eslint";

export type HolypackPlugin = (
  & Omit<ESLint.Plugin, "configs">
  & {
    configs: {
      recommended: Linter.Config[];
    };
  }
);
