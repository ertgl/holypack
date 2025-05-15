export type JestContext = (
  & JestContextBaseProperties
  & JestContextCustomProperties
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type JestContextBaseProperties = {};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JestContextCustomProperties
{}
