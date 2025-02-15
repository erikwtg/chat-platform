import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { RoomsService } from "../service/rooms.service";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoomOwnerOrAdminGuard implements CanActivate {
  constructor(private roomsService: RoomsService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roomId = request.params.id; 

    const room = await this.roomsService.getRoomById(roomId);
    if (!room) throw new ForbiddenException("Sala não encontrada");

    if (room.ownerId === user.id || user.role === "admin") return true;

    throw new ForbiddenException("Apenas o dono da sala ou administradores podem modificar esta sala");
  }
}