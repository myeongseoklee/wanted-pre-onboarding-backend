import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto.toEntity());
    return { message: 'USER_CREATED' };
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.userService.getUser(id);
  }
}
