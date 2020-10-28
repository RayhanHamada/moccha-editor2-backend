import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class RoomKeyValidation implements PipeTransform<string, string> {
  transform(roomKey: string) {
    const valid = isUUID(roomKey, '4');

    if (!valid) {
      throw new BadRequestException(`roomKey ${roomKey} is not an uuid`);
    }
    return roomKey;
  }
}
