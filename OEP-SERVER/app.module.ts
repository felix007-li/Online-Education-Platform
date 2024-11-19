import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/user.module';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { OSSModule } from '@/modules/oss/oss.module';
import { AuthModule } from '@/modules/auth/auth.module';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'P@ssw0rd',
            database: 'oep-server',
            entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
            logging: true,
            synchronize: true,
            autoLoadEntities: true,
        }),
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: './schema.gql',
        }),
        UserModule,
        OSSModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService]
})

export class AppModule {}