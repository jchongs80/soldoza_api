import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlantUserService } from './plant-user.service';

@Controller('plant-users')
export class PlantUserController {
  constructor(private readonly plantUserService: PlantUserService) {}

  @Get('user/:id/plants')
  async getPlantsByUserId(@Param('id') id: string) {
    return await this.plantUserService.getPlantsByUserId(Number(id));
  }

  // @Post('user-disciplines')
  // async getDisciplinesByUserIdAndPlantId(@Body() dto: any) {
  //   return await this.plantUserService.getDisciplinesByUserIdAndPlantId(
  //     Number(dto?.usuario),
  //     Number(dto?.instalacion),
  //   );
  // }
}
