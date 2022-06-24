import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { User } from 'src/user/entities';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.validateUser(dto);

    if (token) {
      return token;
    } else {
      throw new NotFoundException('Invalid credentials');
    }
  }

  @Get('test-firebase')
  async testFirebase(){
    await this.authService.testFirebase();
    return true;
  }
}
