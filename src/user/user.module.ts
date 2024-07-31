import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import {
  Connection,
  MongoDBConnection,
  MySQLConnection,
} from "./connection/connection";
import { MailService, sendMail } from "./mail/mail.service";
import {
  createUserRepository,
  UserRepository,
} from "./user-repository/user-repository";

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
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection],
    },
    { provide: "EmailService", useExisting: MailService },
  ],
  controllers: [UserController],
})
export class UserModule {}
