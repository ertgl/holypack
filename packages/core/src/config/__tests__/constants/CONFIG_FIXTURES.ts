import { CONFIG_NAMESPACE } from "../../explorer/CONFIG_NAMESPACE";

export const CONFIG_FIXTURES = [
  {
    configFileName: `${CONFIG_NAMESPACE}.config.cjs`,
    fixture: "cjs",
  },
  {
    configFileName: `${CONFIG_NAMESPACE}.config.json`,
    fixture: "json",
  },
  {
    configFileName: "package.json",
    fixture: "package",
  },
  {
    configFileName: `${CONFIG_NAMESPACE}.config.toml`,
    fixture: "toml",
  },
  {
    configFileName: `${CONFIG_NAMESPACE}.config.yaml`,
    fixture: "yaml",
  },
  {
    configFileName: `${CONFIG_NAMESPACE}.config.yml`,
    fixture: "yml",
  },
] as const;
