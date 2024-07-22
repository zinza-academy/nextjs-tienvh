import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DatabaseConfig } from './config/database.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { APP_FILTER } from '@nestjs/core'
import { ImportLocationDataCommand } from './config/commands/import-location-data';
import { Provinces } from './entities/provinces.entity';
import { Districts } from './entities/districts.entity';
import { Wards } from './entities/wards.entity';
import { ConsoleModule } from 'nestjs-console';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Provinces, Districts, Wards]),
    UsersModule,
    ConsoleModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ImportLocationDataCommand,
  ],
})
export class AppModule {}
