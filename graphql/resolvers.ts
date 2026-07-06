import type { ColumnRecord } from "./store";
import * as store from "./store";

export const resolvers = {
  Query: {
    columns: () => store.getColumns(),
  },
  Column: {
    tasks: (column: ColumnRecord) => store.getTasksByColumn(column.id),
  },
  Mutation: {
    createColumn: (_: unknown, { name }: { name: string }) =>
      store.createColumn(name),
    renameColumn: (_: unknown, { id, name }: { id: string; name: string }) =>
      store.renameColumn(id, name),
    clearColumn: (_: unknown, { id }: { id: string }) =>
      store.clearColumn(id),
    deleteColumn: (_: unknown, { id }: { id: string }) =>
      store.deleteColumn(id),

    createTask: (
      _: unknown,
      { columnId, title }: { columnId: string; title: string },
    ) => store.createTask(columnId, title),
    updateTask: (_: unknown, { id, title }: { id: string; title: string }) =>
      store.updateTask(id, title),
    deleteTask: (_: unknown, { id }: { id: string }) => store.deleteTask(id),
    moveTask: (
      _: unknown,
      {
        id,
        toColumnId,
        toIndex,
      }: { id: string; toColumnId: string; toIndex: number },
    ) => store.moveTask(id, toColumnId, toIndex),
  },
};
