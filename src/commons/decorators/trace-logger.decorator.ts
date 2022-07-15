import { Inject } from '@nestjs/common';
import { LoggerConfig } from 'src/logger-config/interfaces';
import {
  CustomLoggerService,
  LoggerConfigService,
} from 'src/logger-config/services';

export const TraceLogger =
  (conf?: LoggerConfig) =>
  (
    target: Object,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    const method = propertyDesciptor.value;
    const injectLogger = Inject(CustomLoggerService);
    const injectLoggerConfig = Inject(LoggerConfigService);
    injectLogger(target, 'logger');
    injectLoggerConfig(target, 'loggerConfig');

    propertyDesciptor.value = async function (...args: any[]) {
      const logger: CustomLoggerService = this.logger;
      const loggerConfig: LoggerConfigService = this.loggerConfig;

      const configuration = conf ? conf : loggerConfig.getConfig();

      configuration?.showLogs && logger.request(propertyName, args);

      // invoke greet() and get its return value
      const result = await method.apply(this, args);

      configuration?.showLogs && logger.response(propertyName, result);

      // return the result of invoking the method
      return result;
    };
    return propertyDesciptor;
  };
