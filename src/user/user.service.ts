import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';
import { User } from './entities';

export interface UserFindOne {
  id?: number;
  emailUsuario?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //Private methods

  private async findByEmail(data: UserFindOne) {
    const response = await this.findOne({ emailUsuario: data.emailUsuario });
    if (response) return true;
    return false;
  }

  //Public methods

  async createUser(dto: CreateUserDto) {
    const validation = await this.findByEmail(dto);
    if (validation)
      throw new HttpException('Email already registered', HttpStatus.FORBIDDEN);

    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async findOne(data: UserFindOne) {
    return this.userRepository.findOne({
      where: data,
      relations: ['rol'],
    });
  }

  async getOne(id: number, useEntity?: User) {
    const user = await this.userRepository
      .findOneBy({ id })
      .then((u) => (!useEntity ? u : !!u && useEntity.id === u.id ? u : null));

    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');

    return user;
  }
}
