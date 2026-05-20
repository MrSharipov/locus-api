import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User, users } from '../users';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = users.find((user) => user.username === username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // In a real application, you should hash the password and compare the hashes. This is just a simple example for demonstration purposes.
    const passwordMatches = user.password === password;

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
