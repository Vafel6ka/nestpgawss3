import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { requiredEnvs } from './required-envs';
import * as dotenv from 'dotenv';
import { AppConfigProvider } from './common/config/providers';

dotenv.config();

console.log("process.env.PORT", process.env.REACT_APP_LISTEN_PORT)
//Advantage: This integrates cleanly with NestJS and makes environment variables accessible anywhere via DI.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigProvider);
  appConfig.isEnvSetOrThrow(requiredEnvs); //check the all ens variables

  const port = appConfig.port;
  app.enableCors(appConfig.corsSettings);
  await app.listen(port);
}
bootstrap();
