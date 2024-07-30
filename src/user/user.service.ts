import { Injectable } from "@nestjs/common";
import { IUser } from "./interface/user.interface";

@Injectable()
export class UserService {
  private readonly users: IUser[] = [];

  findAll(): IUser[] {
    return this.users;
  }

  create(user: IUser): void {
    this.users.push(user);
  }
}
