import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';


export class UserRepository extends Repository<Users> {
  
}
