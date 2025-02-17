import { Test, TestingModule } from '@nestjs/testing';
import { RoomsMembershipsService } from './rooms-memberships.service';

describe('RoomsMembershipsService', () => {
  let service: RoomsMembershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsMembershipsService],
    }).compile();

    service = module.get<RoomsMembershipsService>(RoomsMembershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
