import { Controller, Get, Post, Body, HttpCode, Inject } from "@nestjs/common";
import { UserService } from "./user.service";
import { Connection } from "./connection/connection";
import { MailService } from "./mail/mail.service";
import { IUser } from "./interface/user.interface";
import { UserDto } from "./dto/user.dto";
import { UserRepository } from "./user-repository/user-repository";

@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
    private connection: Connection,
    private mailService: MailService,
    private userRepository: UserRepository,
    @Inject("EmailService") private emailService: MailService,
  ) {}

  @Get()
  getUser(): IUser[] {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(201)
  addUser(@Body() userDto: UserDto): string {
    this.userRepository.save(userDto);
    // this.userService.create(userDto);
    return "created success";
  }

  @Get("dbname")
  getDb(): string {
    this.mailService.send();
    this.emailService.send();
    return this.connection.getName();
  }
}
