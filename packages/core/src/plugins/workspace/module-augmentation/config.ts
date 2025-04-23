import type { Workspace } from "../workspace";

declare module "../../../config/config"
{
  interface ConfigCustomProperties
  {
    workspaces?: null | Record<string, Workspace>;
  }
}

export {};
