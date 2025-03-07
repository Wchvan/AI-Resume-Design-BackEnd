import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: '用户名',
    required: true,
  })
  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string;

  @ApiProperty({
    type: String,
    description: '密码',
    required: true,
  })
  @IsNotEmpty({ message: '密码必填' })
  readonly password: string;

  @ApiProperty({
    type: String,
    description: '验证码必填',
  })
  @IsNotEmpty({ message: '验证码必填' })
  captcha: string;
}
