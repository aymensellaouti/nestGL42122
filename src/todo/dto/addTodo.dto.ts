import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { errorMessages } from '../../utils/utils';
export class AddTodoDto {
  @IsNotEmpty()
  @MinLength(3, {
    message: errorMessages.sizeErrorMessage(),
  })
  @MaxLength(10, {
    message: errorMessages.sizeErrorMessage(false),
  })
  name: string;
  @MinLength(6, {
    message: errorMessages.sizeErrorMessage(),
  })
  @IsNotEmpty()
  description: string;
}
