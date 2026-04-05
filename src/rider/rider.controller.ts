import { Controller, Get, Param, Query, Post, Body, Put, Patch, Delete, UsePipes,  UseInterceptors, UploadedFile, ValidationPipe, ParseIntPipe} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express"; 
import { MulterError, diskStorage } from "multer";
import { RiderService } from "./rider.service";
import { UpdateRiderDto, CreateRiderDto, RiderStatusDto, AssignDeliveryDto,  } from './rider.dto';


@Controller("rider")
export class RiderController{
    constructor(private readonly riderService: RiderService) {}

    @Post('create')
    @UsePipes(new ValidationPipe({whitelist: true}))
    createRider(@Body() createRiderDto: CreateRiderDto): object{
        return this.riderService.createRider(createRiderDto);
    }
   
    @Get('all')
    getAllRiders(): object {
        return this.riderService.getAllRiders();
    }

    @Get(':id')
    getRiderById(@Param('id', ParseIntPipe) riderId: number): object {
        return this.riderService.getRiderById(riderId);
    }

    @Put('update/:id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    updateRider(
        @Param('id', ParseIntPipe) riderId: number,
        @Body() updateRiderDto: UpdateRiderDto
    ): object {
        return this.riderService.updateRider(riderId, updateRiderDto);
    }

    @Patch('status/:id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    updateRiderStatus(
        @Param('id', ParseIntPipe) riderId: number,
        @Body() riderStatusDto: RiderStatusDto
    ): object {
        return this.riderService.updateRiderStatus(riderId, riderStatusDto);
    }

    @Delete('delete/:id')
    deleteRider(@Param('id', ParseIntPipe) riderId: number): object {
        return this.riderService.deleteRider(riderId);
    }

    @Post('assign-delivery')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    assignDelivery(@Body() assignDeliveryDto: AssignDeliveryDto): object {
        return this.riderService.assignDelivery(assignDeliveryDto);
    }



   
}