// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // 假设的用户服务
import { ValidatePayload } from './jwt.strategy';
import { UserDocument } from 'src/schema/user.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserDocument | null> {
    const user = await this.userService.findOneByName(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  login(user: UserDocument) {
    const payload: ValidatePayload = {
      username: user.username,
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      sub: (user._id as ObjectId).toString(),
    };
    return {
      ...(JSON.parse(JSON.stringify(user)) as UserDocument),
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const createdUser = await this.userService.create(user);
    const payload: ValidatePayload = {
      username: createdUser.username,
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      sub: (createdUser._id as ObjectId).toString(),
    };
    return {
      ...(JSON.parse(JSON.stringify(user)) as UserDocument),
      access_token: this.jwtService.sign(payload),
    };
  }
}
