// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schema/user.schema';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { responseMessage } from 'src/utils/api';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    return responseMessage(await this.userService.create(createUserDto));
  }

  @Get()
  @ApiOkResponse({ type: Array<User> })
  @ApiOperation({ summary: '查询所有用户' })
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return responseMessage(await this.userService.findAll());
  }

  @Get('find')
  @ApiQuery({ type: String, name: 'username' })
  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: '通过名字查询用户' })
  async findOneByName(@Query('username') username: string) {
    return responseMessage(await this.userService.findOneByName(username));
  }

  @Get(':id')
  @ApiParam({ type: Number, name: 'id' })
  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: '通过id查询用户' })
  async findOne(@Param('id') id: string) {
    return responseMessage(await this.userService.findOne(id));
  }

  @Put(':id')
  @ApiParam({ type: String, name: 'id' })
  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: '通过id更新用户' })
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return responseMessage(await this.userService.update(id, updateUserDto));
  }

  @Delete(':id')
  @ApiParam({ type: String, name: 'id' })
  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: '通过id删除用户' })
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return responseMessage(await this.userService.delete(id));
  }
}
