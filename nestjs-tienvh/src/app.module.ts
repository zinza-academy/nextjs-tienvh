import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictsModule } from 'modules/districts/districts.module';
import { ProvincesModule } from 'modules/provinces/provinces.module';
import { VaccinationSitesModule } from 'modules/vaccination-sites/vaccination-sites.module';
import { VaccinesModule } from 'modules/vaccines/vaccines.module';
import { WardsModule } from 'modules/wards/wards.module';
import { ConsoleModule } from 'nestjs-console';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ImportLocationDataCommand } from './config/commands/import-location-data';
import { DatabaseConfig } from './config/database.config';
import { Districts } from './entities/districts.entity';
import { Provinces } from './entities/provinces.entity';
import { Wards } from './entities/wards.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
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
    ProvincesModule,
    DistrictsModule,
    WardsModule,
    ConsoleModule,
    AuthModule,
    VaccinesModule,
    VaccinationSitesModule,
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
