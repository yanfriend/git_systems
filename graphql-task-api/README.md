# GraphQL Task API

A simple GraphQL-based task management API built with Node.js, TypeScript, and Apollo Server.

## Features
- Task Management: Create, list, and update tasks.
- GraphQL Interface: Single endpoint /graphql.
- TypeScript: Static typing.
- ESLint: Code linting with Airbnb style guide.

## Prerequisites
- Node.js: v16+ (v18 recommended)
- npm: v8+
- TypeScript: npm install -g typescript (optional)

## Installation
1. git clone https://gist.github.com/your-username/your-gist-id
2. cd graphql-task-api
3. npm install

## Project Structure
- graphql-task-api/
  - src/
    - index.ts
    - schema.ts
    - resolvers.ts
  - dist/
  - .eslintrc.js
  - package.json
  - tsconfig.json
  - README.md

## Setup
1. npx tsc
2. node dist/index.js (runs at http://localhost:4000)
3. (Optional) npm install --save-dev ts-node nodemon, add "start": "nodemon src/index.ts" to package.json, then npm start

## Usage
Access http://localhost:4000 for GraphQL Playground.

## Code Overview
### Schema (src/schema.ts)
import { gql } from 'apollo-server';
const typeDefs = gql`type Task {id: String!, title: String!, done: Boolean!} type Query {tasks: [Task!]!, task(id: String!): Task} type Mutation {createTask(title: String!): Task!, updateTask(id: String!, title: String, done: Boolean): Task!}`;
export default typeDefs;

### Resolvers (src/resolvers.ts)
interface Task {id: string; title: string; done: boolean;}
let tasks: Task[] = []; let nextId = 1;
const resolvers = {Query: {tasks: () => tasks, task: (_: any, { id }: { id: string }) => tasks.find(t => t.id === id)}, Mutation: {createTask: (_: any, { title }: { title: string }) => {const task: Task = {id: String(nextId++), title, done: false}; tasks.push(task); return task;}, updateTask: (_: any, { id, title, done }: { id: string; title?: string; done?: boolean }) => {const task = tasks.find(t => t.id === id); if (!task) throw new Error('Task not found'); if (title !== undefined) task.title = title; if (done !== undefined) task.done = done; return task;}}};
export default resolvers;

### Server (src/index.ts)
import { ApolloServer } from 'apollo-server'; import typeDefs from './schema'; import resolvers from './resolvers'; const server = new ApolloServer({ typeDefs, resolvers }); server.listen({ port: 4000 }).then(({ url }) => { console.log(`Server ready at ${url}`); });

## Linting
- ESLint Config: .eslintrc.js with Airbnb style guide.
- Run: npx eslint src/**/*.ts
- Fix: npx eslint src/**/*.ts --fix

## Limitations
- In-Memory Storage: Resets on restart.
- No Authentication.
- Basic Error Handling.

## Future Enhancements
- To add a graphql subscription.
- Add a database.
- Task deletion and filtering.
- Authentication with JWT.
- More schema fields.

## Contributing
Fork, submit PRs, or open issues.

## License
Unlicensed, free to use.
