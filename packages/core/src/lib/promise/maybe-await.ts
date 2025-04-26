export async function maybeAwait<T>(
  value: Promise<T> | T,
): Promise<T>
{
  return value instanceof Promise
    ? await value
    : value;
}
