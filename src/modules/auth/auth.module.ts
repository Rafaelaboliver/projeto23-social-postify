import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repositories/user.repository';
import { PrismaUsersRepository } from '../user/repositories/implementations/prismaUsers.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class AuthModule {}