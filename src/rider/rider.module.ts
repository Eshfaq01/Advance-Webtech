import { Module } from "@nestjs/common";
import { RiderController } from "./rider.controller";
import { RiderService } from "./rider.service";
import { DBModule } from "../db/db.module";
@Module({
    imports: [DBModule],
    controllers: [RiderController],
    providers: [RiderService]   
})

export class RiderModule {}