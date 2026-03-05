import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateRiderDto{
    @IsNotEmpty()
    @IsEmail()
    @Matches(/@aiub\.edu$/,{message: "Email must contain aiub.edu domain"})
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @Matches(/[A-Z]/,{message: "Password must contain at least one uppercase letter"})
    password:string;

    @IsNotEmpty()
    @IsIn(['male', 'female'],{message: "invalid Gender must be male or female"})
    gender: string;
}

export class UpdateRiderDto {
   
    riderName: string;

    @IsNotEmpty()
    @Matches(/^[0-9]+$/, {message: "Phone number must contain only numbers"})
    phone: string;
}

export class RiderStatusDto {
    isOnline: boolean;
}

export class AcceptDeliveryDto {
    
    riderDeliveryTime: number;
}

export class CompleteDeliveryDto {
    otp: number;
}

export class WithdrawRequestDto {
    amount: number;
    method: string;
}
