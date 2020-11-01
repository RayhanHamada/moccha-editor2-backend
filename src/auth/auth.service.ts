import { v4 as uuidV4 } from 'uuid';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { GetRoomsFilterDto } from './dto/GetRoomsFilterDto';
import { CreateRoomDto } from './dto/CreateRoomDto';

import { Room } from './entities/room.entity';
import { ModifyRoomDto } from './dto/ModifyRoomDto';

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

    if (!room) {
      logger.debug(`room ${roomKey} is not found`);
      throw new NotFoundException();
    }

    logger.debug(`room ${roomKey} is ${room === undefined ? 'not ' : ''}found`);

    return room;
  }

  async createRoom({
    creatorName,
    creatorSocketId,
  }: CreateRoomDto): Promise<string> {
    const room = new Room();
    const roomKey = uuidV4();
    room.roomKey = roomKey;
    room.players = [
      {
        name: creatorName,
        socketId: creatorSocketId,
        isRM: true,
      },
    ];

    await room.save();
    logger.debug(`room ${room.roomKey} is created !`);

    return roomKey;
  }

  async removeRoom(roomKey: string): Promise<HttpStatus> {
    const room = await Room.findOne({
      where: {
        roomKey,
      },
    });

    if (!room) {
      logger.debug(`room ${roomKey} not exists`);
      return HttpStatus.NO_CONTENT;
    }

    await room.remove();
    logger.debug(`room ${roomKey} is deleted !`);

    return HttpStatus.OK;
  }

  async modifyRoom({ op, player, playerSocketId, roomKey }: ModifyRoomDto) {
    const room = await this.getRoom(roomKey);

    if (!room) throw new NotFoundException(`room ${roomKey} is not exists`);

    switch (op) {
      case 'addPlayer':
        if (!player)
          throw new BadRequestException(
            `player field should be specified for ${op} operation`,
          );

        room.players.push({
          ...player,
          isRM: false,
        });

        await room.save();
        logger.debug(`player ${player.socketId} added to room ${roomKey}`);
        break;
      case 'removePlayer':
        if (!playerSocketId)
          throw new BadRequestException(
            `playerSocketId field should be specified for ${op} operation`,
          );

        if (room.players.length === 1) {
          await this.removeRoom(roomKey);
          return;
        }

        room.players = room.players.filter(p => p.socketId !== playerSocketId);
        console.log(room.players);
        await room.save();
        logger.debug(`player ${playerSocketId} removed from room ${roomKey}`);
        break;
      case 'changeRm':
        if (!playerSocketId)
          throw new BadRequestException(
            `playerSocketId field should be specified for ${op} operation`,
          );

        room.players = room.players.map(p => {
          if (p.socketId === playerSocketId) {
            p.isRM = true;
            return p;
          }
          p.isRM = false;
          return p;
        });

        await room.save();
        logger.debug(`player ${playerSocketId} is now rm of room ${roomKey}`);
    }
  }
}
