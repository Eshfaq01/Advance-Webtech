import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { UserRoles } from '../enums/user-roles.enum';


@Injectable()
export class RiderGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || user.role !== UserRoles.RIDER) {
            throw new ForbiddenException('Only riders are allowed');
        }
        return true;
    }
}
