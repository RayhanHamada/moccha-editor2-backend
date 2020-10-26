import { HttpService, Injectable, Logger } from '@nestjs/common';
import { CreateRoomDto } from './dto/CreateRoomDto';

import { GetRoomsFilterDto } from './dto/GetRoomsFilterDto';

import { Room } from './entities/room.entity';

const logger = new Logger('Auth Service');

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

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

    logger.debug(`room ${roomKey} is ${room === undefined ? 'not ' : ''}found`);

    return room;
  }

  async createRoom({ creatorName, creatorSocketId }: CreateRoomDto) {
    // TODO: add debug logging
    const room = new Room();
    // fetch uuidv4
    // TODO: change UUID source to just uuid package
    const fetchedUUID: string = (
      await this.httpService
        .get('http://www.uuidgenerator.net/api/version4')
        .toPromise()
    ).data;

    room.roomKey = fetchedUUID;
    room.players = [
      {
        name: creatorName,
        socketId: creatorSocketId,
        isRM: true,
      },
    ];

    await room.save();

    return {
      message: 'success',
    };
  }
}
