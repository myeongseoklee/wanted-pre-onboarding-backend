import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecruitmentNoticeService } from './recruitment-notice.service';
import { CreateRecruitmentNoticeDto } from './dto/create-recruitment-notice.dto';
import { UpdateRecruitmentNoticeDto } from './dto/update-recruitment-notice.dto';

@Controller('recruitment-notice')
export class RecruitmentNoticeController {
  constructor(
    private readonly recruitmentNoticeService: RecruitmentNoticeService,
  ) {}

  @Post()
  async create(@Body() createRecruitmentNoticeDto: CreateRecruitmentNoticeDto) {
    await this.recruitmentNoticeService.create(
      createRecruitmentNoticeDto.toEntity(),
    );
    return { message: 'RECRUITMENT_NOTICE_CREATED' };
  }

  @Get()
  findAll() {
    return this.recruitmentNoticeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentNoticeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecruitmentNoticeDto: UpdateRecruitmentNoticeDto,
  ) {
    return this.recruitmentNoticeService.update(
      +id,
      updateRecruitmentNoticeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentNoticeService.remove(+id);
  }
}
