import { Injectable } from '@nestjs/common';
import { db } from "../../config/drizzle/config";
import { users, rooms, messages } from "../../config/database/schema";
import { eq } from "drizzle-orm";

@Injectable()
export class DatabaseService {
    getUsers() {
        return db.select().from(users);
      }
    
      getRooms() {
        return db.select().from(rooms);
      }
    
      getMessagesByRoom(roomId: number) {
        return db.select().from(messages).where(eq(messages.roomId, roomId));
      }
    
      createMessage(userId: number, roomId: number, content: string) {
        return db.insert(messages).values({ userId, roomId, content });
      }
}
