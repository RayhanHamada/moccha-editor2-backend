import { BaseEntity, Column } from 'typeorm';

/**
 * @description sub entity for room
 */
export class Player extends BaseEntity {
  /**
   * @description name of the player
   */
  @Column()
  name: string;

  /**
   * @description socket.io ID of the player
   */
  @Column()
  socketId: string;

  /**
   * @description is this player is the
   */
  @Column()
  isRM: boolean;
}
