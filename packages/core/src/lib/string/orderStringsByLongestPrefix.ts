export function orderStringsByLongestPrefix(
  strings: string[],
): void
{
  strings.sort(
    (
      a,
      b,
    ) =>
    {
      if (a.startsWith(b))
      {
        return -1;
      }

      if (b.startsWith(a))
      {
        return 1;
      }

      if (a < b)
      {
        return -1;
      }

      return 1;
    },
  );
}
