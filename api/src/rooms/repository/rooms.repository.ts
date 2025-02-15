import { Injectable } from "@nestjs/common";
import { db } from "../../config/drizzle/config";
import { rooms } from "../../config/database/schema";
import { eq } from "drizzle-orm";
import { CreateRoomDto } from "../dto/create-room.dto";

@Injectable()
export class RoomsRepository {
  async findAll() {
    return db.select().from(rooms);
  }

  async findById(id: number) {
    const result = await db.select().from(rooms).where(eq(rooms.id, id)).execute();
    return result[0] || null;
  }

  async createRoom(data: CreateRoomDto & {ownerId: number}) {
    const shortId = Math.random().toString(36).substring(7);
    return db.insert(rooms).values({ 
      ...data,
      shortId,
      ownerId: data.ownerId
    }).returning();
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