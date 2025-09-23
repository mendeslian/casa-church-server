import { Global, Module } from "@nestjs/common";
import { HashService } from "./hash/hash.service";
import { BcryptService } from "./hash/bcrypt.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: HashService,
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashService],
})
export class AuthModule {}
