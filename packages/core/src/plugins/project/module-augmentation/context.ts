import type {
  Project,
  ResolvedProject,
} from "../project";

declare module "../../../context/context"
{
  interface ContextCustomProperties
  {
    project?: null | Project;
  }

  interface ResolvedContextCustomProperties
  {
    project: ResolvedProject;
  }
}

export {};
