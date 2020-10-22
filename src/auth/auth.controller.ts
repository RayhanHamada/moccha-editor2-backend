import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  home() {
    return '/auth endpoint';
  }

  @Get('/rooms')
  getRooms() {
    return this.authService.getRooms();
  }
}
