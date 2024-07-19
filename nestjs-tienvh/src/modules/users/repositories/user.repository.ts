import { Repository } from 'typeorm';
import { User } from '../../../entities/users.entity';

export class UserRepository extends Repository<User> {
  
}
