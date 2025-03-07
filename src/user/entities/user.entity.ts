import { User } from 'src/schema/user.schema';

export class UserEntity extends User {
  _id: string;
  _v: string;
}
