import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Import firebase-admin
import * as admin from 'firebase-admin';
import * as firebaseServiceAccount from './firebase-utils/firebaseServiceAccount.json';

const varTest = {
  type: firebaseServiceAccount.type,
  project_id: firebaseServiceAccount.project_id,
  private_key_id: firebaseServiceAccount.private_key_id,
  private_key: firebaseServiceAccount.private_key,
  client_email: firebaseServiceAccount.client_email,
  client_id: firebaseServiceAccount.client_id,
  auth_uri: firebaseServiceAccount.auth_uri,
  token_uri: firebaseServiceAccount.token_uri,
  auth_provider_x509_cert_url:
    firebaseServiceAccount.auth_provider_x509_cert_url,
  client_x509_cert_url: firebaseServiceAccount.client_x509_cert_url,
};

async function bootstrap() {
  //Variables
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger();

  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(varTest as any),
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
