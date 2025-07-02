export function suppressErrorSync<
  T = unknown,
  F extends ((...args: any) => T) = ((...args: any) => T),
  T_ReturnType = ReturnType<F> | undefined,
>(
  f: F,
  ...args: NoInfer<Parameters<F>>
): T_ReturnType
{
  try
  {
    return f(...args) as unknown as T_ReturnType;
  }
  catch
  {
    return undefined as T_ReturnType;
  }
}
