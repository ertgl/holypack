export type FalsyBooleanString = "0" | "f" | "false" | "n" | "no" | "off";

export type KnownFalsyBooleanValues = 0 | false | FalsyBooleanString;

export type KnownTruthyBooleanValues = 1 | Array<unknown> | Record<keyof object, unknown> | true | TruthyBooleanString;

export type TruthyBooleanString = "1" | "on" | "t" | "true" | "y" | "yes";

export function castBoolean<
  V extends boolean = boolean,
>(
  value: V,
): V;

export function castBoolean(
  value: KnownTruthyBooleanValues,
): true;

export function castBoolean(
  value: KnownFalsyBooleanValues,
): false;

export function castBoolean(
  value: unknown
): boolean;

export function castBoolean(
  value: unknown,
): boolean
{
  if (typeof value === "boolean")
  {
    return value;
  }

  if (typeof value === "string")
  {
    return (
      value === "true"
      || value === "1"
      || value === "yes"
      || value === "on"
      || value === "t"
      || value === "y"
    );
  }

  return Boolean(value);
}
