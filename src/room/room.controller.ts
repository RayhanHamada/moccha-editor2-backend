import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { RoomService } from './room.service';

import { RoomKeyValidation } from './pipes/RoomKeyValidation.pipes';
import { GetRoomsFilterDto } from './dto/GetRoomsFilterDto';
import { CreateRoomDto } from './dto/CreateRoomDto';
import { ModifyRoomDto } from './dto/ModifyRoomDto';

const logger = new Logger('AuthController');

@Controller('auth')
export class RoomController {
  constructor(private readonly authService: RoomService) {}

  @Get()
  home() {
    logger.debug('home directory');
    return '/auth endpoint';
  }

  @Get('/rooms')
  getRooms(@Query() getRoomsDto: GetRoomsFilterDto) {
    logger.debug(
      `get rooms with query param of => from:${getRoomsDto.from ??
        0} and limit:${getRoomsDto.limit ?? 50}`,
    );
    return this.authService.getRooms(getRoomsDto);
  }

  @Get('/room/:roomkey')
  getRoom(
    @Param('roomkey', RoomKeyValidation)
    roomKey: string,
  ) {
    logger.debug(`get room with query param of => roomKey: ${roomKey}`);
    return this.authService.getRoom(roomKey);
  }

  @Post('/room')
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    logger.debug(
      `createRoom creatorName: ${createRoomDto.creatorName} creatorSocketId:${createRoomDto.creatorSocketId}`,
    );
    return this.authService.createRoom(createRoomDto);
  }

  @Delete('/room/:roomkey')
  removeRoom(@Param('roomkey', RoomKeyValidation) roomKey: string) {
    logger.debug(`removeRoom roomKey: ${roomKey}`);
    return this.authService.removeRoom(roomKey);
  }

  @Patch('/room')
  modifyRoom(@Body() modifyRoomDto: ModifyRoomDto) {
    return this.authService.modifyRoom(modifyRoomDto);
  }
}
