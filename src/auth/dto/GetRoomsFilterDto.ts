import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class GetRoomsFilterDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  from: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  limit: number;
}
