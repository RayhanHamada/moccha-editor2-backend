import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { dbModules } from './configs/db';

@Module({
  imports: [AuthModule, ...dbModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
