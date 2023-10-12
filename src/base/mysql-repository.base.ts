import { Repository } from 'typeorm';

export class MysqlRepositoryBase<Entity> {
  constructor(private readonly repository: Repository<Entity>) {}

  getRepository() {
    return this.repository;
  }
}
