import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RecruitmentNoticeService } from './recruitment-notice.service';
import { CreateRecruitmentNoticeDto } from './dto/create-recruitment-notice.dto';
import { UpdateRecruitmentNoticeDto } from './dto/update-recruitment-notice.dto';
import { PaginationOptionsDto } from './dto/query/pagination-options.dto';

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
  async getPaginatedList(
    @Query()
    paginationOptionsDto: PaginationOptionsDto,
  ) {
    return await this.recruitmentNoticeService.getPaginatedList(
      paginationOptionsDto.validatePaginateQuery(),
    );
  }

  @Get(':id')
  async getRecruitmentNoticeById(@Param('id') id: string) {
    return await this.recruitmentNoticeService.getRecruitmentNoticeById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecruitmentNoticeDto: UpdateRecruitmentNoticeDto,
  ) {
    await this.recruitmentNoticeService.update(
      parseInt(id),
      updateRecruitmentNoticeDto.getProps(),
    );

    return { message: 'RECRUITMENT_NOTICE_UPDATED' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.recruitmentNoticeService.remove(+id);

    return { message: 'RECRUITMENT_REMOVED' };
  }
}
