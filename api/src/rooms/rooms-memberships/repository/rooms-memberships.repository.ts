import { Injectable } from "@nestjs/common";
import { db } from "../../../config/drizzle/config";
import { roomMemberships } from "../../../config/database/schema";
import { eq, and } from "drizzle-orm";

@Injectable()
export class RoomMembershipsRepository {
  async addUserToRoom(userId: number, roomId: number) {
    return db.insert(roomMemberships).values({ userId, roomId }).execute();
  }

  async removeUserFromRoom(userId: number, roomId: number) {
    return db.delete(roomMemberships).where(and(eq(roomMemberships.userId, userId), eq(roomMemberships.roomId, roomId))).execute();
  }

  async getUsersInRoom(roomId: number) {
    return db.select().from(roomMemberships).where(eq(roomMemberships.roomId, roomId)).execute();
  }
}