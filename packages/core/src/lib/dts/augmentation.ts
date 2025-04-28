import type {
  ExtractOptionalKeys,
  ExtractRequiredKeys,
} from "./partial";

export type Augment<
  T_Initial,
  T_Overrides,
  T_Optional_Overridden_Keys extends keyof T_Overrides = ExtractOptionalKeys<
    T_Overrides
  >,
  T_Required_Overridden_Keys extends keyof T_Overrides = ExtractRequiredKeys<
    T_Overrides
  >,
  T_Optional_Initial_Keys extends keyof T_Initial = Exclude<
    ExtractOptionalKeys<T_Initial>,
    keyof T_Overrides
  >,
  T_Required_Initial_Keys extends keyof T_Initial = Exclude<
    ExtractRequiredKeys<T_Initial>,
    keyof T_Overrides
  >,
> = (
  (
    readonly [
      T_Initial,
      T_Overrides,
    ] extends readonly [
      object,
      object,
    ]
      ? (
        & {
          [T_Key in T_Optional_Initial_Keys]?: (
            T_Key extends keyof T_Overrides
              ? T_Overrides[T_Key]
              : (
                  T_Key extends keyof T_Initial
                    ? T_Initial[T_Key]
                    : never
                )
          );
        }
        & {
          [T_Key in T_Optional_Overridden_Keys]?: (
            T_Key extends keyof T_Overrides
              ? T_Overrides[T_Key]
              : (
                  T_Key extends keyof T_Initial
                    ? T_Initial[T_Key]
                    : never
                )
          );
        }
        & {
          [T_Key in T_Required_Initial_Keys]: (
            T_Key extends keyof T_Overrides
              ? T_Overrides[T_Key]
              : (
                  T_Key extends keyof T_Initial
                    ? T_Initial[T_Key]
                    : never
                )
          );
        }
        & {
          [T_Key in T_Required_Overridden_Keys]: (
            T_Key extends keyof T_Overrides
              ? T_Overrides[T_Key]
              : (
                  T_Key extends keyof T_Initial
                    ? T_Initial[T_Key]
                    : never
                )
          );
        }
        )
      : (
          T_Initial extends object
            ? T_Initial
            : (
                T_Overrides extends object
                  ? T_Overrides
                  : never
              )
        )
  )
);

export type AugmentVariadic<T_Records> = (
  T_Records extends readonly [infer T_Element_0, infer T_Element_1, ...infer T_Rest]
    ? (
        T_Rest extends readonly [unknown, ...unknown[]]
          ? AugmentVariadic<[Augment<T_Element_0, T_Element_1>, AugmentVariadic<T_Rest>]>
          : Augment<T_Element_0, T_Element_1>
      )
    : (
        T_Records extends readonly [infer T_Element_0]
          ? T_Element_0
          : never
      )
);
