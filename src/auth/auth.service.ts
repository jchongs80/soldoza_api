import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //Private methods

  private async generateToken(user: User) {
    const { id } = user;
    return {
      token: this.jwtService.sign({
        id,
        name: user.nombreUsuario,
        lastName: user.apellidosUsuario,
        role: user.rol,
        userPhoto: user?.fotoUsuario || 'default',
        userSignature: user?.firmaUsuario || 'default',
      }),
    };
  }

  //Public mehtods

  async validateUser(dto: LoginDto): Promise<any> {
    const user = await this.userService.findOne({ emailUsuario: dto.email });

    if (user && user.passwordUsuario === dto.password) {
      return this.generateToken(user);
    }

    return null;
  }

  async testFirebase() {
    const payload = {
      data: {
        MyKey1: 'Hello',
      },
    };

    const options = {
      priority: 'heigh',
      timeToLive: 60 * 60 * 24,
    };

    const token = 'safasf';

    try {
      // const messaging = admin.messaging();
      // console.log(messaging)
      await admin
        .messaging()
        .sendToDevice(token, payload, options)
        .then((x) => {
          console.log('Se envio', x);
        });
    } catch (error) {
      console.log('error ctm', error);
    }
  }
}
