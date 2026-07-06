export const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    columnId: ID!
    order: Int!
  }

  type Column {
    id: ID!
    name: String!
    order: Int!
    tasks: [Task!]!
  }

  type Query {
    columns: [Column!]!
  }

  type Mutation {
    createColumn(name: String!): Column!
    renameColumn(id: ID!, name: String!): Column!
    clearColumn(id: ID!): Column!
    deleteColumn(id: ID!): Boolean!

    createTask(columnId: ID!, title: String!): Task!
    updateTask(id: ID!, title: String!): Task!
    deleteTask(id: ID!): Boolean!
    moveTask(id: ID!, toColumnId: ID!, toIndex: Int!): Task!
  }
`;
