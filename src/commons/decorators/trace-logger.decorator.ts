import { Inject } from '@nestjs/common';
import { CustomLoggerService } from '../services';

export const TraceLogger =
  () =>
  (
    target: Object,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    const method = propertyDesciptor.value;
    const injectLogger = Inject(CustomLoggerService);
    injectLogger(target, 'logger');

    propertyDesciptor.value = async function (...args: any[]) {
      const logger: CustomLoggerService = this.logger;

      logger.request(propertyName, args);

      // invoke greet() and get its return value
      const result = await method.apply(this, args);
      logger.response(propertyName, result);

      // return the result of invoking the method
      return result;
    };
    return propertyDesciptor;
  };
