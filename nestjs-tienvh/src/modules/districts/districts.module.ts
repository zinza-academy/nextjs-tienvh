import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Districts } from 'entities/districts.entity';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { Provinces } from 'entities/provinces.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Districts,Provinces])],
  controllers: [DistrictsController],
  providers: [DistrictsService],

})
export class DistrictsModule {}
