import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Prisma } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: Prisma.ArticleCreateInput) {
    return this.articlesService.create(createArticleDto);
  }

  @Public()
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('sort') sort?: 'title' | 'createdAt',
    @Query('type') type?: 'asc' | 'desc',
  ) {
    return this.articlesService.findAll(page, sort, type);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: Prisma.ArticleUpdateInput,
  ) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
