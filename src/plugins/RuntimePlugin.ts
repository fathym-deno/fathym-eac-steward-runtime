import { EaCRuntimeConfig, EaCRuntimePluginConfig } from '@fathym/eac/runtime/config';
import { EaCRuntimePlugin } from '@fathym/eac/runtime/plugins';
import { EverythingAsCode } from '@fathym/eac';
import { EverythingAsCodeApplications } from '@fathym/eac-applications';
import { EaCStewardPlugin } from '@fathym/eac-applications/steward/plugins';

export default class RuntimePlugin implements EaCRuntimePlugin {
  constructor() {}

  public Setup(_config: EaCRuntimeConfig) {
    const pluginConfig: EaCRuntimePluginConfig<
      EverythingAsCode & EverythingAsCodeApplications
    > = {
      Name: RuntimePlugin.name,
      Plugins: [],//[new EaCStewardPlugin()],
    };

    return Promise.resolve(pluginConfig);
  }
}
