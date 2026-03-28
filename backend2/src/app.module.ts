import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "0888",
      database: "microservice",
      entities: [Product],
      autoLoadEntities: true, 
      synchronize: true,
    }),
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
