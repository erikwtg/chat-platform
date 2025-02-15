import { IsNotEmpty } from "class-validator";

export class LeaveRoomDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  roomId: number;
}