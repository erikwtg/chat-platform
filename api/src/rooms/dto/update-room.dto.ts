import { IsNotEmpty } from "class-validator";

export class UpdateRoomDto {
  @IsNotEmpty()
  name: string;
}