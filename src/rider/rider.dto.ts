export class UpdateRiderDto {
    RiderName: string;
    phone: string;
}

export class AcceptDeliveryDto {
    orderId: number;
    RiderDeliveryTime: number;
}