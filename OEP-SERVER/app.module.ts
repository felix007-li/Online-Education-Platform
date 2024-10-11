import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/user.module';


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'P@ssw0rd',
            database: 'oep-server',
            entities: ['./modules/**/*.entity{.ts,.js}'],
            logging: true,
            synchronize: true,
            autoLoadEntities: true,
        }),
        UserModule
    ],
    controllers: [],
    providers: []
})

export class AppModule {}