import { Injectable, Logger, LoggerService, LogLevel } from '@nestjs/common';
import * as request from 'supertest';

@Injectable()
export class CustomLoggerService implements LoggerService {
  logger = new Logger();
  constructor() {}
  log(description: string, message: any) {
    this.logger.log(`${description} -> ${JSON.stringify(message)}`);
  }
  error(description: string, message: any, ...optionalParams: any[]) {
    this.logger.error(`${description} -> ${JSON.stringify(message)}`);
  }
  warn(description: string, message: any, ...optionalParams: any[]) {
    this.logger.warn(`${description} -> ${JSON.stringify(message)}`);
  }
  debug?(description: string, message: any, ...optionalParams: any[]) {
    this.logger.debug(`${description} -> ${JSON.stringify(message)}`);
  }
  verbose?(description: string, message: any, ...optionalParams: any[]) {
    this.logger.verbose(`${description} -> ${JSON.stringify(message)}`);
  }
  request?(from: string, request: any) {
    this.logger.verbose(
      `Request - ${from} - ${Date()} -> ${JSON.stringify(request)}`,
    );
  }
  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}
