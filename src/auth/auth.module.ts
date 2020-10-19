import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { Room } from './entities/room.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room], 'mongo')],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
