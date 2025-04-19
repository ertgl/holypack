import type { Project } from "../project";

declare module "../../../config/config"
{
  interface ConfigCustomProperties
  {
    project?: null | Project;
  }
}

export {};
