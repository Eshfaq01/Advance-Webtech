import { Injectable, ConflictException ,NotFoundException, BadRequestException} from "@nestjs/common";
import { CreateRiderDto, RiderStatusDto, UpdateRiderDto, AssignDeliveryDto } from "./rider.dto";
import { RiderEntity } from "../entities/rider.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { DeliveryEntity } from "../entities/delivery.entity";
import { CODSubmissionEntity } from "../entities/cod-submission.entity";
import * as bcrypt from 'bcrypt';
import { UserRoles } from "../enums/user-roles.enum";


@Injectable()
export class RiderService{
    constructor(
        @InjectRepository(RiderEntity)
        private riderRepository: Repository<RiderEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(DeliveryEntity)
        private deliveryRepository: Repository<DeliveryEntity>,
        @InjectRepository(CODSubmissionEntity)
        private codsubmissionEntity: Repository<CODSubmissionEntity>
    ){}

    //creating
    async createRider(createRiderDto: CreateRiderDto): Promise<object>{
        const existingUser = await this.userRepository.findOne({ where: { email: createRiderDto.email } });
        if (existingUser) throw new ConflictException('Email already exists');

        const hashedPassword = await bcrypt.hash(createRiderDto.password, 10);

        const user = this.userRepository.create({
            name: createRiderDto.name,
            email: createRiderDto.email,
            password: hashedPassword,
            role: UserRoles.RIDER
        });

        const rider = this.riderRepository.create({
            user,
            phone: createRiderDto.phone,
            riderNid: createRiderDto.riderNid,
            bkashAccount: createRiderDto.bkashAccount,
            bankAccount: createRiderDto.bankAccount,
            isOnline: false
        });

        await this.riderRepository.save(rider);
        return {message: 'Rider created successfully',rider};
    }

    // -------- GET ALL RIDERS --------
    async getAllRiders(): Promise<object> {
        const riders = await this.riderRepository.find({ relations: ['user', 'deliveries'] });
        return { count: riders.length, riders };
    }

    // -------- GET RIDER BY ID --------
    async getRiderById(riderId: number): Promise<object> {
        const rider = await this.riderRepository.findOne({ 
            where: { riderId }, 
            relations: ['user', 'deliveries'] 
        });
        if (!rider) throw new NotFoundException('Rider not found');
        return { rider };
    }

    // -------- UPDATE RIDER INFO --------
    async updateRider(riderId: number, updateRiderDto: UpdateRiderDto): Promise<object> {
        const rider = await this.riderRepository.findOne({ where: { riderId }, relations: ['user'] });
        if (!rider) throw new NotFoundException('Rider not found');

        rider.phone = updateRiderDto.phone;
        rider.user.name = updateRiderDto.name;

        await this.userRepository.save(rider.user);
        await this.riderRepository.save(rider);

        return { message: 'Rider updated successfully', rider };
    }

    // -------- UPDATE RIDER STATUS --------
    async updateRiderStatus(riderId: number, riderStatusDto: RiderStatusDto): Promise<object> {
        const rider = await this.riderRepository.findOne({ where: { riderId } });
        if (!rider) throw new NotFoundException('Rider not found');

        if (riderStatusDto.isOnline !== undefined) rider.isOnline = riderStatusDto.isOnline;
        await this.riderRepository.save(rider);

        return { message: 'Rider status updated successfully', rider };
    }

    // -------- DELETE RIDER --------
    async deleteRider(riderId: number): Promise<object> {
        const rider = await this.riderRepository.findOne({ where: { riderId } });
        if (!rider) throw new NotFoundException('Rider not found');

        await this.riderRepository.remove(rider);
        return { message: 'Rider deleted successfully' };
    }

     // -------- ASSIGN DELIVERY --------
    async assignDelivery(assignDeliveryDto: AssignDeliveryDto): Promise<object> {
        const rider = await this.riderRepository.findOne({ where: { riderId: assignDeliveryDto.riderId } });
        if (!rider) throw new NotFoundException('Rider not found');

        const delivery = await this.deliveryRepository.findOne({ where: { deliveryId: assignDeliveryDto.deliveryId } });
        if (!delivery) throw new NotFoundException('Delivery not found');

        delivery.rider = rider;
        delivery.acceptedAt = new Date();
        await this.deliveryRepository.save(delivery);

        return { message: 'Delivery assigned successfully', delivery };
 
    }
    





    
  


}
