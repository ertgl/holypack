import type { Repository } from "./repository";

declare module "../../config/config"
{
  interface ConfigCustomProperties
  {
    repository?: null | Repository;
  }
}

export {};
