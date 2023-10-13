import { MysqlRepositoryBase } from './../base/mysql-repository.base';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends MysqlRepositoryBase<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async saveIfNotExist(user: User) {
    if (await this.isExist(user))
      throw new BadRequestException('USER_ALREADY_EXIST');
    await this.userRepository.save(user, { reload: false });
  }

  private async isExist(user: User) {
    return await this.userRepository.exist({
      where: { email: user.email },
    });
  }
}
