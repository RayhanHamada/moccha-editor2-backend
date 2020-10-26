import { Injectable, Logger } from '@nestjs/common';

import { GetRoomsFilterDto } from './dto/GetRoomsFilterDto';

import { Room } from './entities/room.entity';

const logger = new Logger('Auth Service');

@Injectable()
export class AuthService {
  async getRooms(getRoomsDto: GetRoomsFilterDto): Promise<Room[]> {
    const from = getRoomsDto.from ?? 0;
    const limit = getRoomsDto.limit ?? 50;

    const rooms = await Room.find({
      skip: from,
      take: limit,
    });

    logger.debug(`room length: ${rooms.length}`);

    return rooms;
  }

  async getRoom(roomKey: string): Promise<Room> {
    const room = await Room.findOne({
      where: {
        roomKey,
      },
    });

    logger.debug(`room ${roomKey} is ${room !== undefined ? 'not' : ''} found`);

    return room;
  }
}
