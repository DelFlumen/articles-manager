import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createArticleDto: Prisma.ArticleCreateInput) {
    return this.databaseService.article.create({ data: createArticleDto });
  }

  async findAll(
    page: number,
    sort?: 'title' | 'createdAt',
    type?: 'asc' | 'desc',
  ) {
    const itemsPerPage = 5;
    const offset = (page - 1) * itemsPerPage;

    const baseQuery = {
      skip: offset,
      take: itemsPerPage,
      include: {
        author: true,
      },
    };

    const query: {
      orderBy?: {
        [key: string]: 'asc' | 'desc';
      };
      skip: number;
      take: number;
    } =
      sort && type
        ? {
            ...baseQuery,
            orderBy: {
              [sort]: type,
            },
          }
        : baseQuery;

    return this.databaseService.article.findMany(query);
  }

  async findOne(id: number) {
    return this.databaseService.article.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateArticleDto: Prisma.ArticleUpdateInput) {
    return this.databaseService.article.update({
      where: {
        id,
      },
      data: updateArticleDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.article.delete({
      where: {
        id,
      },
    });
  }
}
