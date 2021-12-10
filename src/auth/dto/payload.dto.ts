import { UserRoleEnum } from '../../user/entities/user.entity';
export class PayloadDto {
  username: string;
  email: string;
  role: UserRoleEnum;
}
