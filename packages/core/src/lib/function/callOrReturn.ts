export function callOrReturn<
  P = unknown,
  T_Parameters extends any[] = P extends ((...args: infer T_Args) => any) ? T_Args : any[],
  T_ReturnType = P extends ((...args: any[]) => any) ? ReturnType<P> : P,
>(
  value: P,
  ...args: T_Parameters
): T_ReturnType
{
  if (typeof value === "function")
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return value(...args) as T_ReturnType;
  }

  return value as unknown as T_ReturnType;
}
