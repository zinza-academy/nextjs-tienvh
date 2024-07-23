import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Districts } from 'entities/districts.entity';
import { Wards } from 'entities/wards.entity';
import { WardsController } from './wards.controller';
import { WardsService } from './wards.service';
@Module({
  imports: [TypeOrmModule.forFeature([Districts,Wards])],
  controllers: [WardsController],
  providers: [WardsService],

})
export class WardsModule {}
