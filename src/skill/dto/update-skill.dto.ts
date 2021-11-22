import { PartialType } from '@nestjs/swagger';
import { CreateSkillDto } from './create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
