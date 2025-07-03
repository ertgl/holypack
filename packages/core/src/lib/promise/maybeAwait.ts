export async function maybeAwait<
  T,
  U,
>(
  value: Promise<T> | U,
): Promise<T | U>
{
  if (value instanceof Promise)
  {
    return await value;
  }

  return value;
}
