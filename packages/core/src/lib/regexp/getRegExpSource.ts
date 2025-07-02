export function getRegExpSource(
  pattern: RegExp | string,
): string
{
  if (pattern instanceof RegExp)
  {
    return pattern.source;
  }

  return pattern;
}
