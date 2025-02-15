import { pgTable, pgEnum, jsonb, boolean, serial, text, varchar, index, unique, timestamp, integer } from "drizzle-orm/pg-core";

// 🟢 Tabela de Usuários
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  usernameIdx: index("username_idx").on(table.username),
  emailIdx: index("email_idx").on(table.email),
}));

// 🟢 Tabela de Salas (Rooms)
export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  shortId: varchar("short_id", { length: 10 }).unique().notNull(),
  ownerId: integer("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  shortIdIdx: unique("short_id_idx").on(table.shortId),
}));

// 🟢 Tabela de membros das Salas (Membership Room)
export const roleEnum = pgEnum("role", ["admin", "moderator", "member"]);
export const roomMemberships = pgTable("room_memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  role: roleEnum("role").notNull().default("member"),
}, (table) => ({
  uniqueUserRoom: unique("user_room_idx").on(table.userId, table.roomId)
}));

// 🟢 Tabela de Mensagens
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isEdited: boolean("is_edited").default(false).notNull(),
  editHistory: jsonb("edit_history").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  roomIdIdx: index("room_id_idx").on(table.roomId),
  isEditedIdx: index("is_edited_idx").on(table.isEdited),
  createdAtIdx: index("created_at_idx").on(table.createdAt),
}));

