import { Inject, Injectable } from '@nestjs/common';
import { LoggerConfig } from '../interfaces';

@Injectable()
export class LoggerConfigService {
  constructor(@Inject('LOGGER_CONFIG') public config: LoggerConfig) {}

  getConfig() {
    return this.config;
  }
}
