import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../users/service/users.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Email ou senha incorretos");
    }
    
    const { password: _, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { id: user.id, email: user.email, username: user.username };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: "1h",
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: "7d",
      }),
    };
  }
}
