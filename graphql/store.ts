import { and, asc, eq, ne, type InferSelectModel } from "drizzle-orm";
import { GraphQLError } from "graphql";

import { db } from "@/db/client";
import { columns, tasks } from "@/db/schema";

export type ColumnRecord = InferSelectModel<typeof columns>;
export type TaskRecord = InferSelectModel<typeof tasks>;

const MAX_COLUMNS = 5;

const reindexColumns = async () => {
  const rows = await db.select().from(columns).orderBy(asc(columns.order));
  await Promise.all(
    rows.map((row, index) =>
      db.update(columns).set({ order: index }).where(eq(columns.id, row.id)),
    ),
  );
};

const reindexColumnTasks = async (columnId: string) => {
  const rows = await db
    .select()
    .from(tasks)
    .where(eq(tasks.columnId, columnId))
    .orderBy(asc(tasks.order));
  await Promise.all(
    rows.map((row, index) =>
      db.update(tasks).set({ order: index }).where(eq(tasks.id, row.id)),
    ),
  );
};

const getColumns = async (): Promise<ColumnRecord[]> => {
  return db.select().from(columns).orderBy(asc(columns.order));
};

const getTasksByColumn = async (columnId: string): Promise<TaskRecord[]> => {
  return db
    .select()
    .from(tasks)
    .where(eq(tasks.columnId, columnId))
    .orderBy(asc(tasks.order));
};

const createColumn = async (name: string): Promise<ColumnRecord> => {
  const existing = await db.select().from(columns);
  if (existing.length >= MAX_COLUMNS) {
    throw new GraphQLError("You can only create up to 5 columns.", {
      extensions: { code: "COLUMN_LIMIT_REACHED" },
    });
  }
  const [column] = await db
    .insert(columns)
    .values({ name, order: existing.length })
    .returning();
  return column;
};

const renameColumn = async (id: string, name: string): Promise<ColumnRecord> => {
  const [column] = await db
    .update(columns)
    .set({ name })
    .where(eq(columns.id, id))
    .returning();
  if (!column) throw new GraphQLError("Column not found.");
  return column;
};

const clearColumn = async (id: string): Promise<ColumnRecord> => {
  const [column] = await db.select().from(columns).where(eq(columns.id, id));
  if (!column) throw new GraphQLError("Column not found.");
  await db.delete(tasks).where(eq(tasks.columnId, id));
  return column;
};

const deleteColumn = async (id: string): Promise<boolean> => {
  // tasks in this column cascade-delete via the FK's ON DELETE CASCADE.
  const [deleted] = await db.delete(columns).where(eq(columns.id, id)).returning();
  if (!deleted) return false;
  await reindexColumns();
  return true;
};

const createTask = async (
  columnId: string,
  title: string,
): Promise<TaskRecord> => {
  const existing = await db
    .select()
    .from(tasks)
    .where(eq(tasks.columnId, columnId));
  const [task] = await db
    .insert(tasks)
    .values({ title, columnId, order: existing.length })
    .returning();
  return task;
};

const updateTask = async (id: string, title: string): Promise<TaskRecord> => {
  const [task] = await db
    .update(tasks)
    .set({ title })
    .where(eq(tasks.id, id))
    .returning();
  if (!task) throw new GraphQLError("Task not found.");
  return task;
};

const deleteTask = async (id: string): Promise<boolean> => {
  const [deleted] = await db.delete(tasks).where(eq(tasks.id, id)).returning();
  if (!deleted) return false;
  await reindexColumnTasks(deleted.columnId);
  return true;
};

const moveTask = async (
  id: string,
  toColumnId: string,
  toIndex: number,
): Promise<TaskRecord> => {
  const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
  if (!task) throw new GraphQLError("Task not found.");

  const [targetColumn] = await db
    .select()
    .from(columns)
    .where(eq(columns.id, toColumnId));
  if (!targetColumn) throw new GraphQLError("Target column not found.");

  const fromColumnId = task.columnId;

  const siblings = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.columnId, toColumnId), ne(tasks.id, id)))
    .orderBy(asc(tasks.order));

  const ordered = [...siblings];
  ordered.splice(toIndex, 0, task);

  await Promise.all(
    ordered.map((t, index) =>
      db
        .update(tasks)
        .set({ order: index, columnId: toColumnId })
        .where(eq(tasks.id, t.id)),
    ),
  );

  if (fromColumnId !== toColumnId) {
    await reindexColumnTasks(fromColumnId);
  }

  const [updated] = await db.select().from(tasks).where(eq(tasks.id, id));
  return updated;
};

export {
  getColumns,
  getTasksByColumn,
  createColumn,
  renameColumn,
  clearColumn,
  deleteColumn,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
};
