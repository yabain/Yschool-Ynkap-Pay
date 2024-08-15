import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ApplicationModule } from './application/application.module';
import { FinancialTransactionModule } from './financial-transaction/financial-transaction.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import configuration from './shared/config/configuration';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SharedModule,
    ApplicationModule,
    UserModule,
    FinancialTransactionModule,
    PaymentMethodModule
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export class AppModule {}
