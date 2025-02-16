import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { RoomsMembershipsService } from "../rooms-memberships/service/rooms-memberships.service";

@Injectable()
export class RoomOwnerOrAdminGuard implements CanActivate {
  constructor(private roomsMembershipsService: RoomsMembershipsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roomId = request.params.id;

    const membership = await this.roomsMembershipsService.getRoomMembership(roomId, user.id);
    if (!membership || 'message' in membership) throw new ForbiddenException("Você não é membro desta sala");

    if (membership.role === "admin" || membership.role === "moderator") return true;

    throw new ForbiddenException("Apenas administradores e moderadores podem modificar esta sala");
  }
}