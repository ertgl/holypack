import type {
  Context,
  ResolvedContext,
} from "../context";

export async function emitWarning(
  context: Context | ResolvedContext,
  err: Error,
): Promise<void>
{
  await context.hooks.emitWarning.promise(
    context,
    err,
  );
}
