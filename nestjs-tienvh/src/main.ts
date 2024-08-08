import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>('CORS_ORIGIN')
  app.enableCors({
    origin: corsOrigin, 
    credentials: true,
  });

  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
