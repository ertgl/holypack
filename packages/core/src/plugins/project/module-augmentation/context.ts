import type {
  Project,
  ResolvedProject,
} from "../project";

declare module "../../../context/context"
{
  interface ContextCustomProperties
  {
    project: ResolvedProject;
  }

  interface StrictContextCustomProperties
  {
    project?: null | Project;
  }
}

export {};
