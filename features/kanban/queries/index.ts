import { gql } from "@apollo/client";

const GET_COLUMNS = gql`
  query GetColumns {
    columns {
      id
      name
      order
      tasks {
        id
        title
        order
      }
    }
  }
`;

const CREATE_COLUMN = gql`
  mutation CreateColumn($name: String!) {
    createColumn(name: $name) {
      id
    }
  }
`;

const RENAME_COLUMN = gql`
  mutation RenameColumn($id: ID!, $name: String!) {
    renameColumn(id: $id, name: $name) {
      id
      name
    }
  }
`;

const CLEAR_COLUMN = gql`
  mutation ClearColumn($id: ID!) {
    clearColumn(id: $id) {
      id
    }
  }
`;

const DELETE_COLUMN = gql`
  mutation DeleteColumn($id: ID!) {
    deleteColumn(id: $id)
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($columnId: ID!, $title: String!) {
    createTask(columnId: $columnId, title: $title) {
      id
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String!) {
    updateTask(id: $id, title: $title) {
      id
      title
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

const MOVE_TASK = gql`
  mutation MoveTask($id: ID!, $toColumnId: ID!, $toIndex: Int!) {
    moveTask(id: $id, toColumnId: $toColumnId, toIndex: $toIndex) {
      id
      columnId
      order
    }
  }
`;

export {
  GET_COLUMNS,
  CREATE_COLUMN,
  RENAME_COLUMN,
  CLEAR_COLUMN,
  DELETE_COLUMN,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  MOVE_TASK,
};
