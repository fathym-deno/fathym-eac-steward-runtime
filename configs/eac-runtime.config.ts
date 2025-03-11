import { EaCRuntime } from '@fathym/eac/runtime';
import RuntimePlugin from '../src/plugins/RuntimePlugin.ts';
import { EaCRuntimeHandlerRouteGroup } from '@fathym/eac/runtime/pipelines';
import { defineEaCStewardConfig } from '../src/utils/defineEaCStewardConfig.ts';

export const config = defineEaCStewardConfig({
  Plugins: [new RuntimePlugin()],
});

export function configure(
  _rt: EaCRuntime,
): Promise<EaCRuntimeHandlerRouteGroup[] | undefined> {
  return Promise.resolve([]);
}
