import { CompanyRepository } from './company.repository';
import { Injectable } from '@nestjs/common';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async create(company: Company) {
    await this.companyRepository.saveIfNotExist(company);
  }
}
