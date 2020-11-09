import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

describe('AuthController', () => {
  let controller: RoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [RoomService],
    }).compile();

    controller = module.get<RoomController>(RoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('home should return "/auth endpoint"', () => {
    expect(controller.home()).toBe('/auth endpoint');
  });
});
