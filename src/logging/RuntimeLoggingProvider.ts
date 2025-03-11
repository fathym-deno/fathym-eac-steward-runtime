import { EaCApplicationsLoggingProvider } from '@fathym/eac-applications/runtime/logging';

export class RuntimeLoggingProvider extends EaCApplicationsLoggingProvider {
  constructor() {
    const loggingPackages = ['@fathym/common', '@fathym/fathym-eac-steward-runtime'];

    super(loggingPackages);
  }
}
