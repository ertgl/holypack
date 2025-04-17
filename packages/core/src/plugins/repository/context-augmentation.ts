import type {
  Repository,
  ResolvedRepository,
} from "./repository";

declare module "../../context"
{
  interface ContextCustomProperties
  {
    repository?: null | Repository;
  }

  interface ResolvedContextCustomProperties
  {
    repository: ResolvedRepository;
  }
}
