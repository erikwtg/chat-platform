import { Test, TestingModule } from '@nestjs/testing';
import { RoomsMembershipsController } from './rooms-memberships.controller';

describe('RoomsMembershipsController', () => {
  let controller: RoomsMembershipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsMembershipsController],
    }).compile();

    controller = module.get<RoomsMembershipsController>(RoomsMembershipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
