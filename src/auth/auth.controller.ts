import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Session,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; // swagger 接口文档
import * as svgCaptcha from 'svg-captcha';
import { AuthService } from './auth.service';
import { VerifyCodeResponseDto } from './dto/verifyCodeResponse.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/schema/user.schema';
import { RegisterDto } from './dto/register.dto';
import { SessionInfo } from 'src/typings/session';
import { responseMessage } from 'src/utils/api';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * @description: 获取图形验证码
   */
  @Get('captcha') //当请求该接口时，返回一张随机图片验证码
  @ApiOkResponse({ type: VerifyCodeResponseDto })
  @ApiOperation({ summary: '获取图形验证码' })
  getCaptcha(@Session() session: SessionInfo) {
    const captcha = svgCaptcha.createMathExpr({
      //可配置返回的图片信息
      size: 4, // 验证码长度
      ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
      noise: 2, // 干扰线条的数量
      width: 132,
      height: 40,
      fontSize: 50,
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#fff',
    });
    session.captcha = captcha.text; //使用session保存验证，用于登陆时验证
    return responseMessage({ value: captcha.text, image: captcha.data });
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: '登录' })
  async login(@Session() session: SessionInfo, @Body() body: LoginDto) {
    if (body.captcha != session.captcha) {
      throw new BadRequestException(`captcha is error`);
    }
    delete session.captcha;
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return responseMessage(this.authService.login(user));
  }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: '创建用户' })
  async register(@Session() session: SessionInfo, @Body() body: RegisterDto) {
    const { captcha, ...user } = body;
    if (captcha != session.captcha) {
      throw new BadRequestException(`captcha is error`);
    }
    delete session.captcha;
    const data = await this.authService.register(user);
    return responseMessage(data);
  }
}
