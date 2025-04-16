export type ExampleConfig = {
  flag?: boolean | null;
};

export type ExampleContext = {
  custom?: null | number;
};

export type ExampleResolvedConfig = {
  flag: NonNullable<ExampleConfig["flag"]>;
};

export type ExampleResolvedContext = {
  custom: NonNullable<ExampleContext["custom"]>;
};
