import { Injectable } from "@nestjs/common";
import { db } from "../../config/drizzle/config";
import { messages } from "../../config/database/schema";
import { eq, asc } from "drizzle-orm";

@Injectable()
export class MessagesRepository {
  async createMessage(data: { content: string; userId: number; roomId: number }) {
    return db.insert(messages).values(data).returning();
  }

  async updateMessage(messageId: number, content) {
    return db.update(messages).set(content).where(eq(messages.id, messageId)).execute();
  }

  async deleteMessage(messageId: number) {
    return db.delete(messages).where(eq(messages.id, messageId)).execute();
  }

  async getMessageById(messageId: number) {
    return await db.select().from(messages).where(eq(messages.id, messageId)).execute().then(rows => rows[0] || null);
  }

  async getMessagesByRoom(roomId: number, limit = 20) {
    return db.select().from(messages).where(eq(messages.roomId, roomId)).orderBy(asc(messages.createdAt)).limit(limit).execute();
  }
}