import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class DateIntervalDto {
  @IsOptional()
  @IsDate()
  @Type((newType) => Date)
  dateMin: Date;
  @IsDate()
  @IsOptional()
  @Type((newType) => Date)
  dateMax: Date;
}
