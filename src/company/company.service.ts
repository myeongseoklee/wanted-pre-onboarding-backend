import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }
}
