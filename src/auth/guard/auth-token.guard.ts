import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { REQUEST_TOKEN_PAYLOAD } from "../auth.constants";

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) throw new UnauthorizedException("Falha na autenticação");

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
      });

      req[REQUEST_TOKEN_PAYLOAD] = payload;
    } catch (error) {
      throw new UnauthorizedException("Token inválido ou expirado");
    }

    return true;
  }

  extractTokenFromHeader(req: Request): string | undefined {
    const authorization = req.headers?.authorization;

    if (!authorization || typeof authorization !== "string") return;

    return authorization.trim();
  }
}
