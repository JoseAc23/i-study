import { InjectRepository } from "@nestjs/typeorm";
import { UserMapper } from "src/users/application/mappers/user.mapper";
import { User } from "src/users/domain/aggregates/user/user.entity";
import { UserRepository } from "src/users/domain/aggregates/user/user.repository";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

export class UserEntityRepository implements UserRepository  {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    let userEntity: UserEntity = UserMapper.domainToEntity(user);
    userEntity = await this.userRepository.save(userEntity);
    return UserMapper.entityToDomain(userEntity);
  }

  async update(user: User): Promise<User> {
    let userEntity: UserEntity = UserMapper.domainToEntity(user);
    let userId: number = user.getId().getValue();
    await this.userRepository.update({ id: userId }, userEntity);
    return user;
  }

  async delete(userId: number): Promise<boolean> {
    await this.userRepository.delete({ id: userId });
    return true;
  }

  async getById(id: number): Promise<User> {
    let userEntity: UserEntity = await this.userRepository.findOne({ where: { id: id } });
    return UserMapper.entityToDomain(userEntity);
  }

  async getByEmail(email: string): Promise<User> {
    let userEntity: UserEntity = await this.userRepository.createQueryBuilder().where("email = :email", { email }).getOne();
    return UserMapper.entityToDomain(userEntity);
  }
}