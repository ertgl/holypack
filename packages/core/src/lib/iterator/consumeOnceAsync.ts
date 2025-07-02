export async function consumeOnceAsync<T>(
  iterable: AsyncIterable<T> | Iterable<T>,
): Promise<T | undefined>
{
  if (Symbol.asyncIterator in iterable)
  {
    for await (const value of iterable)
    {
      return value;
    }
  }
  else
  {
    for (const value of iterable)
    {
      return value;
    }
  }

  return undefined;
}
