import { Injectable } from "@nestjs/common";

@Injectable()
export class RiderService{

    createRider(createRiderDto) {
    return {
        message: "Rider Created Successfully",
        data: createRiderDto
    };
}
    
    getProfile(){
        return {
            message: "Rider prfile info--",
            data: {RiderId: 1, RiderName: "Nita", phone: "01750000000"}
        };
    }

    
    updateProfile(updateRiderDto){
        return{
            message: "Profile Updated", 
            data: updateRiderDto
        };
    }

    updateAvailability(riderStatusDto){
        return{
            message: "Availability updated",
            isOnline: riderStatusDto.isOnline
        };
    }

    getDeliveryRequests(restaurantId?: number) {
        const requests = [
            { orderId: 101, restaurantId: 2, order: "Burger", status: "pending" },
            { orderId: 102, restaurantId: 3, order: "Pizza", status: "accepted" },
            { orderId: 103, restaurantId: 5, order: "Sandwich", status: "pending" }
        ];

        const filtered = restaurantId
            ? requests.filter(r => r.restaurantId === restaurantId)
            : requests;

        return {
            message: restaurantId ? "Request for specifice restaurant" : "All delivery requests",
            filterRestaurant: restaurantId || null,
            data: filtered
        };
    }


    acceptDelivery(orderId, riderDeliveryTime) {
        return {
            message: "Delivery Accepted",
            orderId,
            riderDeliveryTime
        };
    }

    getActiveDeliveries(status?: string) {
        const deliveries = [
            { orderId: 101, rider: "alo", status: "pending" },
            { orderId: 102, rider: "niti", status: "accepted" },
            { orderId: 103, rider: "akhi", status: "onway" }
        ];

        const filtered = status
            ? deliveries.filter(d => d.status === status)
            : deliveries;

        return {
            message: status ? "Deliveries with specific status" : "All active deliveries",
            filterStatus: status || null,
            data: filtered
        };
    }

    completeDelivery(orderId, otp){
        return{
            message: "Delivery completed",
            orderId,
            otp
        };
    }

    

    requestWithdraw(withdrawRequestDto){
        return{
            message: "Withdraw request submitted",
            data: withdrawRequestDto
        };
    }

    cancelWithdraw(withdrawId) {
        return {
            message: "Withdraw request cancelled",
            withdrawId
        };
    }
  


}