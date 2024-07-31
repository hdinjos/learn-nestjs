import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import {
  Connection,
  MongoDBConnection,
  MySQLConnection,
} from "./connection/connection";
import { MailService, sendMail } from "./mail/mail.service";

@Module({
  providers: [
    UserService,
    {
      provide: Connection,
      useClass: process.env.DB ? MySQLConnection : MongoDBConnection,
    },
    {
      provide: MailService,
      useValue: sendMail,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
