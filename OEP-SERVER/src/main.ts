import { NestFactory } from "@nestjs/core";
import { AppModule } from "app.module";
// import { config } from "dotenv";
import * as dotenv from "dotenv";
import { getEnvConfig } from "./shared/utils";
import { ConfigService } from "@nestjs/config";

dotenv.config({
  path: getEnvConfig(),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
