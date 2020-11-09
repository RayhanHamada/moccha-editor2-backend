import { IsInt, IsOptional, Min } from 'class-validator';

export class GetRoomsFilterDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  from: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;
}
