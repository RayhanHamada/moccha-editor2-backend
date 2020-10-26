import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule, Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { Room } from './entities/room.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), HttpModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
