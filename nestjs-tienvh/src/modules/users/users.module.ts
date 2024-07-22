import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from '../../entities/users.entity';
import { Wards } from 'entities/wards.entity';
import { Provinces } from 'entities/provinces.entity';
import { Districts } from 'entities/districts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users,Provinces,Districts,Wards])],
  controllers: [UsersController],
  providers: [UsersService],

})
export class UsersModule {}
