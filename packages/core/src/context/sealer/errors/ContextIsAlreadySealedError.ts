import { HolypackError } from "../../../error/HolypackError";
import type { Context } from "../../Context";

import { ERROR_CONTEXT_IS_ALREADY_SEALED } from "./ERROR_CONTEXT_IS_ALREADY_SEALED";

export class ContextIsAlreadySealedError extends HolypackError
{
  context: Context;

  constructor(
    context: Context,
  )
  {
    super(
      ERROR_CONTEXT_IS_ALREADY_SEALED,
      "Context is already sealed",
    );

    this.context = context;
  }
}
