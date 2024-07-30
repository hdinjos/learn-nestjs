import { NestFactory } from "@nestjs/core";
import { VersioningType } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix("api", {
    exclude: ["/"],
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["1", "2"],
  });
  await app.listen(3000);
}
bootstrap();
