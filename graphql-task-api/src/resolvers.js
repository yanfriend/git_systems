"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/resolvers.ts
var tasks = [];
var nextId = 1;
var resolvers = {
    Query: {
        tasks: function () { return tasks; },
        task: function (_, _a) {
            var id = _a.id;
            return tasks.find(function (t) { return t.id === id; });
        },
    },
    Mutation: {
        createTask: function (_, _a) {
            var title = _a.title;
            var task = { id: String(nextId++), title: title, done: false };
            tasks.push(task);
            return task;
        },
        updateTask: function (_, _a) {
            var id = _a.id, title = _a.title, done = _a.done;
            var task = tasks.find(function (t) { return t.id === id; });
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
