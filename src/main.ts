import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Import firebase-admin
import * as admin from 'firebase-admin';
import * as firebaseServiceAccount from './firebase-utils/firebaseServiceAccount.json';

async function bootstrap() {
  //Variables
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger();

  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount as any),
  });

  //Config
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Validate body if accept any other field in json
    }),
  );
  await app.listen(3000);

  //Debug
  logger.log(`Server rendering in ${await app.getUrl()}`);
  logger.log(`Environment: ${process.env.DATABASE_HOST}`);
}
bootstrap();
