import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  creatorName: string;

  @IsNotEmpty()
  creatorSocketId: string;
}
