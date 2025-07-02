export type ImportFunction<
  T = unknown,
> = (
  path: string,
) => Promise<T>;
