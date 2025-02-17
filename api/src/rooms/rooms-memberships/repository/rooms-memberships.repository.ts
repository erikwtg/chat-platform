import { Injectable } from "@nestjs/common";
import { db } from "../../../config/drizzle/config";
import { roomMemberships, users } from "../../../config/database/schema";
import { eq, and } from "drizzle-orm";

@Injectable()
export class RoomMembershipsRepository {
  async addUserToRoom(userId: number, roomId: number, role: "admin" | "moderator" | "member") {
    return db.insert(roomMemberships).values({ userId, roomId, role }).execute();
  }

  async removeUserFromRoom(userId: number, roomId: number) {
    return db.delete(roomMemberships).where(and(eq(roomMemberships.userId, userId), eq(roomMemberships.roomId, roomId))).execute();
  }

  async getUsersInRoom(roomId: number) {
    return db.select().from(roomMemberships).where(eq(roomMemberships.roomId, roomId)).execute();
  }

  async getRoomMembership(roomId: number, userId: number) {
    return db
      .select({
        userId: users.id,
        username: users.username,
        role: roomMemberships.role
      })
      .from(roomMemberships)
      .innerJoin(users, eq(roomMemberships.userId, userId))
      .where(eq(roomMemberships.roomId, roomId))
      .execute()
      .then(rows => rows[0] || null);
  }
}