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

  @Post(':id/recruitment-notice/:recruitmentNoticeId')
  async createJobApplication(
    @Param('id') id: number,
    @Param('recruitmentNoticeId') recruitmentNoticeId: number,
  ) {
    await this.userService.createJobApplication(id, recruitmentNoticeId);

    return { message: 'JOB_APPLICATION_CREATED' };
  }
}
