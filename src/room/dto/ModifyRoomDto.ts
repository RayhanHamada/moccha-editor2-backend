import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class ModifyRoomDto {
  /**
   * @description room key
   */
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  roomKey: string;

  /**
   * @description patch operation types (required)
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/^(addPlayer|removePlayer|changeRm)$/)
  op: 'addPlayer' | 'removePlayer' | 'changeRm';

  /**
   * @description the player, required for addPlayer operation
   */
  @IsOptional()
  @IsObject()
  player: {
    name: string;
    socketId: string;
  };

  /**
   * @description player socketId, required for removePlayer and changeRm operation
   */
  @IsOptional()
  @IsString()
  playerSocketId: string;
}
