import { Injectable, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ManagerError } from 'src/common/errors/manager.error';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ResponseAllUsers } from './interfaces/response-users.interface';
import { UserRole } from 'src/common/enums/roles.enum';
import { UserGender } from 'src/common/enums/gender.enum';
import { UsersReturn } from './interfaces/users-return.interface';

@Injectable()
export class UsersService {
  constructor() {}

  private users: UserEntity[] = [
    {
      id: 1,
      name: 'Virginia',
      age: 20,
      photo: 'asdsad.jpg',
      email: 'Virginia@gmail.com',
      password: 'virginia123',
      role: UserRole.ADMIN_ROLE,
      gender: UserGender.GENDER_FEMALE,
      isActive: true,
    },
    {
      id: 2,
      name: 'Couso',
      age: 20,
      photo: 'asdsad.jpg',
      email: 'Virginia@gmail.com',
      password: 'couso123',
      role: UserRole.USER_ROLE,
      gender: UserGender.GENDER_MALE,
      isActive: true,
    },
  ];

  async create(createuserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user: UserEntity = {
        ...createuserDto,
        isActive: true,
        id: this.users.length + 1,
      };

      this.users.push(user);

      return user;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllUsers> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      if (this.users.length === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'User not found!',
        });
      }

      const total = this.users.filter((user) => user.isActive === true).length;
      const lastPage = Math.ceil(total / limit);
      const data = this.users
        .filter((user) => user.isActive === true)
        .slice(skip, limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: number): Promise<UsersReturn> {
    try {
      const user = this.users.find(
        (user) => user.id === id && user.isActive === true,
      );
      if (!user) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'user not found',
        });
      }
      const { password, ...rest } = user

      return rest;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      const indexUser = this.users.findIndex(
        (user) => user.id === id && user.isActive === true,
      );
      if (indexUser === -1) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'user not found',
        });
      }

      this.users[indexUser] = {
        ...this.users[indexUser],
        ...updateUserDto,
      };
      return this.users[indexUser];
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
  async remove(id: number): Promise<UserEntity> {
    try {
      const indexUser = this.users.findIndex(
        (user) => user.id === id && user.isActive === true,
      );
      if (indexUser === -1) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      this.users[indexUser] = {
        ...this.users[indexUser],
        isActive: false,
      };

      return this.users[indexUser];
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
