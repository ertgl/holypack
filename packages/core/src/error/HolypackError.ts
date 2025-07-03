import type { Optional } from "../lib/object/Optional";

import { ERROR_HOLYPACK } from "./ERROR_HOLYPACK";

export class HolypackError extends Error
{
  constructor(
    name: Optional<string>,
    message: string,
  )
  {
    super(message);
    this.name = name || ERROR_HOLYPACK;
  }
}
