import { BasePlugin } from "../extension";

import type { Integration } from "./integration";

export abstract class BaseIntegration extends BasePlugin implements Integration
{}
