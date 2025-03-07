import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  @ApiProperty({
    type: String,
    description: '验证码必填',
  })
  @IsNotEmpty({ message: '验证码必填' })
  captcha: string;
}
