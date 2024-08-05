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
import { UserRepository } from "./user-repository/user-repository";
import { ConfigService } from "@nestjs/config";
// import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    UserService,
    // PrismaService,
    UserRepository,
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
    { provide: "EmailService", useExisting: MailService },
  ],
  controllers: [UserController],
})
export class UserModule {}
