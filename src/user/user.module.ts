import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import {
  Connection,
  // MongoDBConnection,
  // MySQLConnection,
  createConnection,
} from "./connection/connection";
import { MailService, sendMail } from "./mail/mail.service";
import {
  createUserRepository,
  UserRepository,
} from "./user-repository/user-repository";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [
    UserService,
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
      // useClass: process.env.DB ? MySQLConnection : MongoDBConnection, change to factotory method
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
