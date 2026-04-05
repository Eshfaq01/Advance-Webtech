import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bycrypt from 'bcrypt';



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ){}


    async login(email: string, password: string): Promise<object> {
        const user = await this.userRepository.findOne({ 
            where: { email: email } 
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is incorrect');
        }

        const payload = { 
            userId: user.userId,
            email: user.email,
            role: user.role
        };
        
        const {password: _, ...result} = user;
        return {
            success: true,
            message: 'Login successful',
            data: result,
            accessToken: this.jwtService.sign(payload)

        };
    }
}