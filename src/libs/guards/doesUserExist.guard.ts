import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { UserService } from '../../app/controllers/auth/user/user.service';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(
      context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.validateRequest(request);
  }

  async validateRequest(request): Promise<boolean> {
    const userId = request.body.id;
    const userExist = await this.userService.getUserById(userId);
    if (userExist) {
      throw new ForbiddenException('This ID already exists');
    }
    return true;
  }
}
