import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const columns = pgTable("columns", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  order: integer("order").notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  columnId: uuid("column_id")
    .notNull()
    .references(() => columns.id, { onDelete: "cascade" }),
  order: integer("order").notNull(),
});
