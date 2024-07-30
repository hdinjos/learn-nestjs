import { Controller, Get, Post, Body, HttpCode } from "@nestjs/common";
import { UserService } from "./user.service";
import { IUser } from "./interface/user.interface";
import { UserDto } from "./dto/user.dto";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

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
}
