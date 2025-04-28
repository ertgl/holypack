export type ConfigProviderContext = (
  & ConfigProviderContextBaseProperties
  & ConfigProviderContextCustomProperties
);

export type ConfigProviderContextBaseProperties = {
  cwd: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigProviderContextCustomProperties
{}
