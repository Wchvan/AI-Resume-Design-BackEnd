import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
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
    description: '简历模板必填',
    required: false,
  })
  @IsNotEmpty({ message: '简历模板必填' })
  readonly resume: string;
}
