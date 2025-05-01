import type {
  Repository,
  ResolvedRepository,
} from "../repository";

declare module "../../../context/context"
{
  interface ContextCustomProperties
  {
    repository: ResolvedRepository;
  }

  interface StrictContextCustomProperties
  {
    repository?: null | Repository;
  }
}

export {};
