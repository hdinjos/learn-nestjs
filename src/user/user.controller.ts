import { Controller, Get, Post, Body, HttpCode } from "@nestjs/common";
import { UserService } from "./user.service";
import { Connection } from "./connection/connection";
import { MailService } from "./mail/mail.service";
import { IUser } from "./interface/user.interface";
import { UserDto } from "./dto/user.dto";

@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
    private connection: Connection,
    private mailService: MailService,
  ) {}

  @Get()
  getUser(): IUser[] {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(201)
  addUser(@Body() userDto: UserDto): string {
    this.userService.create(userDto);
    return "created success";
  }

  @Get("dbname")
  getDb(): string {
    this.mailService.send();
    return this.connection.getName();
  }
}
