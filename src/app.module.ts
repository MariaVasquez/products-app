import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/database.config';
import { typeOrmTestConfig } from './config/database.test.config';

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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./environments/.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        process.env.NODE_ENV === 'test'
          ? typeOrmTestConfig
          : typeOrmConfigAsync,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
