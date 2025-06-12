import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/database.config';
import { typeOrmTestConfig } from './config/database.test.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./environments/.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    UsersModule,
    ...(process.env.NODE_ENV === 'test'
      ? [TypeOrmModule.forRoot(typeOrmTestConfig)]
      : [TypeOrmModule.forRootAsync(typeOrmConfigAsync)]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
