import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './shared/exceptions';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }));

  app.enableCors();
  app.useGlobalFilters(new MongoExceptionFilter())
  useContainer(app.select(AppModule),{fallbackOnErrors:true});
  
  const config = new DocumentBuilder()
    .setTitle('Y-School Paiement API')
    .setDescription('L\'API de paiement de Y-School')
    .setVersion('1.0')
    .addTag('y-school')
    .addTag("paiement")
    .addTag("REST")
    .build();
  const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
