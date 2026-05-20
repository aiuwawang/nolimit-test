import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(body: any) {
    const existingUser = await this.usersService.findOneByEmail(body.email);
    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.usersService.create({ ...body, password: hashedPassword });
    
    return { message: 'User registered successfully', id: user.id };
  }

  async login(body: any) {
    const user = await this.usersService.findOneByEmail(body.email);
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    const payload = { email: user.email, sub: user.id };
    return { token: this.jwtService.sign(payload) };
  }
}