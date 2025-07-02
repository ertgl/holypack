import { HolypackError } from "../../../error/HolypackError";

import { ERROR_MUTEX_LOCK_TIMED_OUT } from "./ERROR_MUTEX_LOCK_TIMED_OUT";

export class MutexLockTimedOutError extends HolypackError
{
  constructor()
  {
    super(
      ERROR_MUTEX_LOCK_TIMED_OUT,
      "Mutex lock timed out",
    );
  }
}
