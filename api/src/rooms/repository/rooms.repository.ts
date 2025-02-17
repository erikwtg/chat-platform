import { Injectable } from "@nestjs/common";
import { db } from "../../config/drizzle/config";
import { roomMemberships, rooms, users } from "../../config/database/schema";
import { eq, sql, and } from "drizzle-orm";
import { CreateRoomDto } from "../dto/create-room.dto";

@Injectable()
export class RoomsRepository {
  async findAll(userId: number) {
    return db.select({
      id: rooms.id,
      name: rooms.name,
      createdAt: rooms.createdAt,
      isMember: sql`
        CASE 
          WHEN COUNT(${roomMemberships.userId}) > 0 THEN TRUE 
          ELSE FALSE 
        END
      `.as("isMember"),
    })
    .from(rooms)
    .leftJoin(roomMemberships, 
      and(eq(rooms.id, roomMemberships.roomId), eq(roomMemberships.userId, userId))
    )
    .groupBy(rooms.id);
  }

  async findById(id: number) {
    const result = await db.select().from(rooms).where(eq(rooms.id, id)).execute();
    return result[0] || null;
  }

  async createRoom(dto: CreateRoomDto) {
    const shortId = Math.random().toString(36).substring(7);
    return db.insert(rooms).values({ ...dto, shortId }).returning();
  }

  async updateRoom(id: number, name: string) {
    return db.update(rooms).set({ name }).where(eq(rooms.id, id)).execute();
  }

  async deleteRoom(id: number) {
    return db.delete(rooms).where(eq(rooms.id, id)).execute();
  }

  async getRoomById(roomId: number) {
    return db.select().from(rooms).where(eq(rooms.id, roomId)).execute().then(rows => rows[0] || null);
  }
}