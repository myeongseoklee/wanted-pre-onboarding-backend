import { Controller, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    await this.companyService.create(createCompanyDto.toEntity());
    return { message: 'COMPANY_CREATED' };
  }
}
