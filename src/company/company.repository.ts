import { BadRequestException, Injectable } from '@nestjs/common';
import { MysqlRepositoryBase } from '../base/mysql-repository.base';
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyRepository extends MysqlRepositoryBase<Company> {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {
    super(companyRepository);
  }

  async saveIfNotExist(company: Company) {
    if (await this.isExist(company))
      throw new BadRequestException('COMPANY_ALREADY_EXIST');
    return await this.getRepository().save(company, { reload: false });
  }

  private async isExist(company: Company) {
    return await this.getRepository().exist({
      where: { email: company.email },
    });
  }
}
