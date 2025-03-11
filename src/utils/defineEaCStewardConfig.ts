import { GenericEaCRuntime } from '@fathym/eac/runtime';
import { EaCRuntimeConfig, GenericEaCConfig } from '@fathym/eac/runtime/config';
import { LoggingProvider } from '@fathym/common/log';
import { mergeWithArrays } from '@fathym/common';
import { RuntimeLoggingProvider } from '../logging/RuntimeLoggingProvider.ts';
import { FathymEaCDenoKVPlugin } from '@fathym/eac-applications/runtime/plugins';

export async function defineEaCStewardConfig(
  config: Partial<EaCRuntimeConfig> | Promise<Partial<EaCRuntimeConfig>>,
  loggingProvider: LoggingProvider = new RuntimeLoggingProvider(),
): Promise<EaCRuntimeConfig> {
  return mergeWithArrays(
    GenericEaCConfig((cfg) => new GenericEaCRuntime(cfg), loggingProvider),
    {
      Plugins: [new FathymEaCDenoKVPlugin()],
    } as Partial<EaCRuntimeConfig>,
    await config,
  );
}
