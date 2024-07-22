import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from '../../entities/users.entity';
import { Wards } from 'src/entities/wards.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Users,Wards])],
  controllers: [UsersController],
  providers: [UsersService],

})
export class UsersModule {}
