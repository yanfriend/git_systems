"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let tasks = [];
let nextId = 1;
const resolvers = {
    Query: {
        tasks: () => tasks,
        task: (_, { id }) => {
            console.log(`Resolving task with id: ${id}`);
            const task = tasks.find(t => t.id === id);
            console.log(`Found task:`, task);
            if (!task) {
                console.log(`Task with id ${id} not found`);
                throw new Error(`Task with id ${id} not found`);
            }
            return task;
        },
    },
    Mutation: {
        createTask: (_, { title }) => {
            const task = { id: String(nextId++), title, done: false };
            tasks.push(task);
            return task;
        },
        updateTask: (_, { id, title, done }) => {
            const task = tasks.find(t => t.id === id);
            if (!task)
                throw new Error('Task not found');
            if (title !== undefined)
                task.title = title;
            if (done !== undefined)
                task.done = done;
            return task;
        },
    },
};
exports.default = resolvers;
