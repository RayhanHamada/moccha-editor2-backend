import { Controller, Get, Logger, Param, Query } from '@nestjs/common';

import { AuthService } from './auth.service';

import { GetRoomsFilterDto } from './dto/GetRoomsFilterDto';

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
    @Param('roomkey')
    roomKey: string,
  ) {
    logger.debug(`get room with query param of => roomKey:${roomKey}`);
    return this.authService.getRoom(roomKey);
  }
}
