export type ConfigContext = (
  & ConfigContextBaseProperties
  & ConfigContextCustomProperties
);

export type ConfigContextBaseProperties = {
  cwd: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigContextCustomProperties
{}
