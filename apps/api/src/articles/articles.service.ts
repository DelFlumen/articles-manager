import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createArticleDto: Prisma.ArticleCreateInput) {
    return this.databaseService.article.create({ data: createArticleDto });
  }

  async findAll(sort?: 'title' | 'date', type?: 'asc' | 'desc') {
    return sort && type
      ? this.databaseService.article.findMany({
          orderBy: [
            {
              [sort]: type,
            },
          ],
        })
      : this.databaseService.article.findMany();
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
