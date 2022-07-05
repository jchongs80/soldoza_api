import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const data = await this.userService.getOne(Number(id));
    return data;
  }

  @Put(':id/update-device-token')
  async updateTokenDeviceUser(
    @Param('id') id: string,
    @Body() dto: CreateUserDto,
  ) {
    return await this.userService.updateToken(Number(id), dto.token);
  }
}
