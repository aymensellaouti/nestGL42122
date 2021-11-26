import { OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { RegisterDto } from './register.dto';

export class SignInDto extends OmitType(RegisterDto, ['email']) {}
