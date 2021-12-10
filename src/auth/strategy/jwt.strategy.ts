import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { PayloadDto } from '../dto/payload.dto';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    });
  }
  // La payloadInterface sert à typer votre code à vous de la créer selon votre payload
  async validate(payload: PayloadDto) {
    // validate jwt ce qu'on retourne ici ca va etre injecté dans la requete
    const user = this.userRepository.findOne({ username: payload.username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
