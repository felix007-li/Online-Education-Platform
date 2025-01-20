import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UserModule } from "@/modules/user/user.module";
import { AppController } from "app.controller";
import { AppService } from "app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";
import { OSSModule } from "@/modules/oss/oss.module";
import { AuthModule } from "@/modules/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { StudentModule } from "@/modules/student/student.module";
import { OrganizationModule } from "@/modules/organization/organization.module";
import { CourseModule } from "@/modules/course/course.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      //   envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: "./schema.gql",
    }),
    UserModule,
    OSSModule,
    AuthModule,
    StudentModule,
    OrganizationModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
