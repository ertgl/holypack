export function getValueByKeyPath<T>(
  obj: unknown,
  keyPath: Iterable<string>,
): T | undefined
{
  let current: unknown = obj;

  for (const key of keyPath)
  {
    if (current == null)
    {
      return undefined;
    }

    current = (current as Record<string, unknown>)[key];
  }

  return current as T | undefined;
}
