import { Controller, Get, Param, Query, Post, Body, Put, Patch, Delete } from "@nestjs/common"; 
import { RiderService } from "./rider.service";
import { UpdateRiderDto, AcceptDeliveryDto } from './rider.dto';


@Controller("rider")
export class RiderController{
    constructor(private readonly riderService: RiderService) {}

    @Get('profile')
    getProfile(): object {
        return this.riderService.getProfile();
    }

    @Put('profile')
    UpdateProfile(@Body() dto: UpdateRiderDto): object{
        return this.riderService.updateProfile(dto);
    }
    
   @Get('delivery-requests')
    getRequests(@Query('status') status: string): object {
        return this.riderService.getRequests(status);
    }
    
    @Post('accept')
    acceptDelivery(@Body() dto: AcceptDeliveryDto): object {
        return this.riderService.acceptDelivery(dto);
    }

    @Get('active')
    getActive(): object {
        return this.riderService.getActive();
    }

    @Patch('deliver/:orderId')
    markDelivered(@Param('orderId') orderId: string): object {
        return this.riderService.markDelivered(Number(orderId));
    }

    @Get('earnings')
    getEarnings(): object {
        return this.riderService.getEarnings();
    }

    @Delete('delivery/:orderId')
    deletePast(@Param('orderId') orderId: string): object {
        return this.riderService.deletePast(Number(orderId));
    }

    

}