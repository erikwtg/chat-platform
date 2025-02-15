import { IsNotEmpty } from "class-validator";

export class JoinRoomDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  roomId: number;
}