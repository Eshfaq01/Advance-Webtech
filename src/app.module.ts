import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RiderModule } from './rider/rider.module';


@Module({
  imports: [RiderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
