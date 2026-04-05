import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RiderModule } from './rider/rider.module';

@Module({
  imports: [RiderModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'DB',
      autoLoadEntities: true,
      synchronize: true ,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
