import { Controller, Get, Param, Query } from '@nestjs/common';

import { AuthService } from './auth.service';

import { GetRoomsFilterDto } from './dto/GetRoomsFilterDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  home() {
    return '/auth endpoint';
  }

  @Get('/rooms')
  getRooms(@Query() getRoomsDto: GetRoomsFilterDto) {
    return this.authService.getRooms(getRoomsDto);
  }

  @Get('/room/:roomkey')
  getRoom(
    @Param('roomkey')
    roomKey: string,
  ) {
    return this.authService.getRoom(roomKey);
  }
}
