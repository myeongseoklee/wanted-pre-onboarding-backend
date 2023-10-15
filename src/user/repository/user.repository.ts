import { MysqlRepositoryBase } from '../../base/mysql-repository.base';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends MysqlRepositoryBase<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async saveIfNotExist(user: User) {
    if (await this.isExist(user))
      throw new BadRequestException('USER_ALREADY_EXIST');
    await this.getRepository().save(user, { reload: false });
  }

  private async isExist(user: User) {
    return await this.getRepository().exist({
      where: { email: user.email },
    });
  }
}
