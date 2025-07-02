export function shuffleArrayByReference(
  array: unknown[],
): void
{
  array.sort(
    () =>
    {
      return Math.random() - 0.5;
    },
  );
}
