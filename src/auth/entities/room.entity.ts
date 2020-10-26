import { IsUUID } from 'class-validator';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity('rooms')
export class Room extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  /**
   * @description room key
   */
  @Column()
  @IsUUID('4', {
    message: arg => `${arg.targetName} is not a UUID V4`,
  })
  roomKey: string;

  /**
   * @description room members
   */
  @Column(() => Player)
  players: Player[];
}
