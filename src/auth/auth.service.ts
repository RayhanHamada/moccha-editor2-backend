import { Injectable } from '@nestjs/common';

import { Room } from './entities/room.entity';

@Injectable()
export class AuthService {
  async getRooms(): Promise<Room[]> {
    const rooms = await Room.find();

    return rooms;
  }
}
