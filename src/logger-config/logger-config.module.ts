import { Module } from '@nestjs/common';
import { LoggerConfig } from './interfaces';
import { CustomLoggerService, LoggerConfigService } from './services';

@Module({})
export class LoggerConfigModule {
  static forRoot(loggerConfig: LoggerConfig) {
    return {
      global: true,
      module: LoggerConfigModule,
      providers: [
        { provide: 'LOGGER_CONFIG', useValue: loggerConfig },
        LoggerConfigService,
        CustomLoggerService,
      ],
      exports: [LoggerConfigService, CustomLoggerService],
    };
  }
}
