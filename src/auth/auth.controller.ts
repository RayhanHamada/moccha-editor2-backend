import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { GetRoomsFilterDto } from './dto/GetRoomsFilterDto';
import { CreateRoomDto } from './dto/CreateRoomDto';
import { RoomKeyValidation } from './pipes/RoomKeyValidation.pipes';

const logger = new Logger('AuthController');

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
