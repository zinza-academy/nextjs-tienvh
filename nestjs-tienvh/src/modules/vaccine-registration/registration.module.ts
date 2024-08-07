import { VaccinesRegistration } from "entities/vaccines-registration.entity";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccinesRegistrationController } from "./registration.controller";
import { VaccinesRegistrationService } from "./registration.service";
import { Users } from "entities/users.entity";
import { VaccinationSite } from "entities/vaccination-site.entity";
import { PriorityGroups } from "entities/priority_groups.entity";
import { Jobs } from "entities/jobs.entity";
import { Schedules } from "entities/schedules.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VaccinesRegistration,Users,VaccinationSite,PriorityGroups,Jobs,Schedules])],
  controllers: [VaccinesRegistrationController],
  providers: [VaccinesRegistrationService],
  exports: [VaccinesRegistrationService],
})
export class VaccinesRegistrationModule {}
