import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: Role.GUEST,
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: Role.REGISTERED_USER,
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: Role.ADMIN,
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: Role.REGISTERED_USER,
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: Role.GUEST,
    },
  ];

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserDto });
  }

  async findAll(role?: Role, sort?: 'name' | 'date', type?: 'asc' | 'desc') {
    const baseQuery = {
      where: role
        ? {
            role,
          }
        : {},
      include: { articles: true },
    };

    if (sort && type) {
      return this.databaseService.user.findMany({
        ...baseQuery,
        orderBy: [
          {
            [sort]: type,
          },
        ],
      });
    }
    return this.databaseService.user.findMany(baseQuery);
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
      include: { articles: true },
    });
  }

  async findOneByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: {
        email,
      },
      include: { articles: true },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
