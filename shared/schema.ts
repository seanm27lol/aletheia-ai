import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  duration: text("duration").notNull(),
  views: text("views").notNull().default("0"),
  topic: text("topic").notNull(),
  perspectiveLeft: text("perspective_left").notNull(),
  perspectiveCenter: text("perspective_center").notNull(), 
  perspectiveRight: text("perspective_right").notNull(),
  sources: text("sources").array().notNull(),
  verified: boolean("verified").notNull().default(true),
  thumbnail: text("thumbnail").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  // Add user relations here as needed
}));

export const storiesRelations = relations(stories, ({ one }) => ({
  // Add story relations here as needed
}));

// User schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Story schemas
export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
  createdAt: true,
});

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;
