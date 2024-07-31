import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Connection } from "./connection/connection";

@Module({
  providers: [UserService, Connection],
  controllers: [UserController],
})
export class UserModule {}
