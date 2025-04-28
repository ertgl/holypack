export type ExtractOptionalKeys<T> = Exclude<
  {
    [K in keyof T]: undefined extends T[K] ? K : never;
  }[keyof T],
  undefined
>;

export type ExtractRequiredKeys<T> = Exclude<
  {
    [K in keyof T]: undefined extends T[K] ? never : K;
  }[keyof T],
  undefined
>;
