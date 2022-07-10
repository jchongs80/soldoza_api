import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos';
import * as admin from 'firebase-admin';
import { TraceLogger } from 'src/commons/decorators';

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
        userType: user?.tipoUsuario,
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

  @TraceLogger()
  async testFirebase() {
    var payload = {
      notification: {
        title: 'This is a diegdddo kraenau',
        body: 'This is the body of the notification message.',
        sound: 'default',
      },
    };
    const options = {
      priority: 'high',
      timeToLive: 60 * 60 * 24,
    };
    const token =
      'fzgSqdkHSxKohjFBUyWSXH:APA91bHhaNV1FaQKo5VMKgcK2pk6728hP9OJTOsRZVMA3wo0VzOdTUOIRYp6XoMu3H0shDu6tyiSczGqiscZDcY_FDQdF15ZrQT1tqelNn2TIzVseshcwS04vaMqYeOCiXcgnmj3pTEj';
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
      console.log('ERRO AUTH', error);
    }
  }
}
