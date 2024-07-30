import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller({
  path: "/",
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
