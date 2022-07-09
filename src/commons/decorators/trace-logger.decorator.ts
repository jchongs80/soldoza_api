import { Inject, Logger } from '@nestjs/common';
import { CustomLoggerService } from '../services';

export function TraceLogger(
  target: Object,
  propertyName: string,
  propertyDesciptor: PropertyDescriptor,
): PropertyDescriptor {
  const method = propertyDesciptor.value;
  const injectLogger = Inject(CustomLoggerService);
  injectLogger(target, 'logger');

  propertyDesciptor.value = async function (...args: any[]) {
    const logger: CustomLoggerService = this.logger;

    // convert list of greet arguments to string
    const params = args.map((a) => JSON.stringify(a)).join();
    logger.request(propertyName, JSON.parse(params));

    // invoke greet() and get its return value
    const result = await method.apply(this, args);
    logger.response(propertyName, result);

    // return the result of invoking the method
    return result;
  };
  return propertyDesciptor;
}
