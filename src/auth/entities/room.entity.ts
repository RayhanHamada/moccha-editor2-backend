import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity('room')
export class Room extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  /**
   * @description room key
   */
  @Column()
  roomKey: string;

  /**
   * @description room members
   */
  @Column(type => Player)
  players: Player[];
}
