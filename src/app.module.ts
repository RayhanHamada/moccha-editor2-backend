import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { RoomModule } from './room/room.module';
import { AppService } from './app.service';
import { dbModules } from './configs/db';

@Module({
  imports: [RoomModule, ...dbModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
