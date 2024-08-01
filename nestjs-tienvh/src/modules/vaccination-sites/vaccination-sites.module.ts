import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccinationSite } from "entities/vaccination-site.entity";
import { VaccinationSitesService } from "./vaccination-sites.service";
import { Wards } from 'entities/wards.entity';
import { VaccinationSitesController } from './vaccination-sites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VaccinationSite,Wards])],
  controllers: [VaccinationSitesController],
  providers: [VaccinationSitesService],
  exports: [VaccinationSitesService],
})
export class VaccinationSitesModule {}
