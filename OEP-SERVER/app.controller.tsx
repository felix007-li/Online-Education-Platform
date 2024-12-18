import { User } from "@/modules/user/models/user.entity";
import { UserService } from "@/modules/user/user.service";
import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppService } from "app.service";

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly appService: AppService,
    private configService: ConfigService
  ) {}

  @Get("/create")
  async create(id: string): Promise<boolean> {
    return await this.userService.create({
      id,
      name: "name1",
      desc: "administrator",
      tel: "4444",
    });
  }

  @Get("/del")
  async del(): Promise<boolean> {
    return await this.userService.del("ed01b596-61f1-470f-ace7-3a127b374373");
  }

  @Get("/update")
  async update(): Promise<boolean> {
    return await this.userService.updateUserInfo(
      "bdc7fcbe-1c1b-4061-b7f2-e480e7428cf4",
      {
        name: "name1111111",
      }
    );
  }

  @Get("/find")
  async find(id: string): Promise<User> {
    return await this.userService.find(id);
  }

  @Get()
  getHello(): string {
    return this.configService.get("JWT_SECRET");
  }
}
