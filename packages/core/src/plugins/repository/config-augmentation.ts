import type { Repository } from "./repository";

declare module "../../config"
{
  interface ConfigCustomProperties
  {
    repository?: null | Repository;
  }
}
