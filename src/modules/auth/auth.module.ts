import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    
    UsersModule,
    
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    JwtModule.register({
      secret: 'RAHASIA_NOLIMIT_123', 
      signOptions: { expiresIn: '1h' }, 
    }),

    SequelizeModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy], 
})
export class AuthModule {}