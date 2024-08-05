import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "../dto/user.dto";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async save(req: UserDto): Promise<User> {
    return this.prismaService.user.create({
      data: req,
    });
  }
}
