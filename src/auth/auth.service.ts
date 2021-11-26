import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from 'src/user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/signin.dto';
import { UserService } from '../user/user.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(registerDto: RegisterDto): Promise<User> {
    /* 
            Recherche le User
            1- Si existe throw error 
            2- Si non 
                générie 🧂 
                générie pwd 
                savi
        */
    const { username, password, email } = registerDto;
    const user = await this.userService.findUserByUsernameOrEmail(
      username,
      email,
    );
    if (user) {
      throw new BadRequestException('User existant !!');
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      registerDto.password = hashedPassword;
      const newUser = await this.userService.create(registerDto);
      delete newUser.password;
      return newUser;
    }
  }

  /*     signin(credentials: SignInDto): Promise<User> {} */
}
