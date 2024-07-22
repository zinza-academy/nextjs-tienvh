import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvincesService } from './provinces.service';
import { Provinces } from 'entities/provinces.entity';
import { ProvincesController } from './provinces.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Provinces])],
  controllers: [ProvincesController],
  providers: [ProvincesService],

})
export class ProvincesModule {}
