export type Options = (
  & OptionsBaseProperties
  & OptionsCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type OptionsBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OptionsCustomProperties
{}

export type ResolvedOptions = (
  & ResolvedOptionsBaseProperties
  & ResolvedOptionsCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ResolvedOptionsBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResolvedOptionsCustomProperties
{}
