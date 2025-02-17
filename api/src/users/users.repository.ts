import { Injectable } from "@nestjs/common";
import { db } from "../config/drizzle/config";
import { users } from "../config/database/schema";
import { eq } from "drizzle-orm";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersRepository {
  async findAll() {
    return db.select().from(users);
  }

  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .execute();
    return result[0] || null;
  }

  async findById(id: number) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .execute();
    return result[0] || null;
  }

  async createUser(username: string, email: string, hashedPassword: string) {
    const result = await db.insert(users).values({ username, email, password: hashedPassword }).returning();
    return result[0];
  }

  async updateUser(id: number, dto) {
    console.log(id, dto)
    return await db.update(users).set(dto).where(eq(users.id, id)).execute();
  }
}