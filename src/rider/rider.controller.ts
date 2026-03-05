import { Controller, Get, Param, Query, Post, Body, Put, Patch, Delete, UsePipes,  UseInterceptors, UploadedFile, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express"; 
import { MulterError, diskStorage } from "multer";
import { RiderService } from "./rider.service";
import { UpdateRiderDto, CreateRiderDto, RiderStatusDto, AcceptDeliveryDto, CompleteDeliveryDto, WithdrawRequestDto } from './rider.dto';


@Controller("rider")
export class RiderController{
    constructor(private readonly riderService: RiderService) {}

   
    @Post('create')
    @UsePipes(new ValidationPipe())
    createRider(@Body() createRiderDto: CreateRiderDto) {
        return this.riderService.createRider(createRiderDto);
    }
   
    @Get('profile')
    getProfile(): object {
        return this.riderService.getProfile();
    }

    @Put('profile')
    @UsePipes(new ValidationPipe())
    updateProfile(@Body() updateRiderDto: UpdateRiderDto): object{
        return this.riderService.updateProfile(updateRiderDto);
    }
    
    @Patch("status")
    updateAvailability(@Body() riderStatusDto:RiderStatusDto){
        return this.riderService.updateAvailability(riderStatusDto);
    }

    @Get('delivery-requests')
    getRequests(@Query('restaurantId') restaurantId?: string): object {
        return this.riderService.getDeliveryRequests(restaurantId ? Number(restaurantId) : undefined);
    }
    
    @Post('delivery/:orderId/accept')
    acceptDelivery(@Param("orderId") orderId: string, @Body("riderDeliveryTime") riderDeliveryTime): object {
        return this.riderService.acceptDelivery(Number(orderId), riderDeliveryTime);
    }

    @Get('active-deliveries')
    getActiveDeliveries(@Query("status") status?:string ): object {
        return this.riderService.getActiveDeliveries(status);
    }

    @Patch('deliver/:orderId/complete')
    completeDelivery(@Param('orderId') orderId: string, @Body('otp') otp): object {
        return this.riderService.completeDelivery(Number(orderId),otp);
    }

    @Post("withdraw")
    requestWithdraw(@Body() withdrawRequestDto) {
        return this.riderService.requestWithdraw(withdrawRequestDto);
    }

    @Delete('withdraw/:withdrawId')
    cancelWithdraw(@Param("withdrawId") withdrawId: string): object {
        return this.riderService.cancelWithdraw(Number(withdrawId));
  }

    

}