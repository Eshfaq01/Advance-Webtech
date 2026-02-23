import { Injectable } from "@nestjs/common";

@Injectable()
export class RiderService{

    
    getProfile(){
        return {
            message: "prfile info--",
            data: {RiderId: 1, RiderName: "Nita", phone: "01750000000"}
        };
    }

    
    updateProfile(dto){
        return{
            message: "Profile Updated", 
            data: dto
        };
    }

    getRequests(status?: string) {

        const requests = [
            { orderId: 101, status: "pending" },
            { orderId: 102, status: "accepted" },
            { orderId: 103, status: "pending" }
        ];

        if (status) {
            return {
                message: "Filtered Delivery Requests",
                data: requests.filter(r => r.status === status)
            };
        }

        return {
            message: "All Delivery Requests",
            data: requests
        };
    }

    acceptDelivery(dto) {
        return {
            message: "Delivery Accepted",
            data: dto
        };
    }

    getActive() {
        return {
            message: "Active Deliveries",
            data: []
        };
    }

    
    markDelivered(orderId: number) {
        return {
            message: "Order Delivered",
            data: { orderId: orderId }
        };
    }

    getEarnings() {
        return {
            message: "Earnings",
            totalDeliveries: 5,
            totalEarnings: 250
        };
    }

    deletePast(orderId: number) {
        return {
            message: "Past Delivery Deleted",
            orderId: orderId
        };
    }

  


}