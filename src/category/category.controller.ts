import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('discipline/:id')
  async getCategoriesByDisciplineId(@Param('id') id: string) {
    return await this.categoryService.getCategorysByDisciplineId(Number(id));
  }
}
