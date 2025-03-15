interface Task {
    id: string;
    title: string;
    done: boolean;
  }
  
  let tasks: Task[] = [];
  let nextId = 1;
  
  const resolvers = {
    Query: {
      tasks: () => tasks,
      task: (_: any, { id }: { id: string }) => {
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
      createTask: (_: any, { title }: { title: string }) => {
        const task: Task = { id: String(nextId++), title, done: false };
        tasks.push(task);
        return task;
      },
      updateTask: (_: any, { id, title, done }: { id: string; title?: string; done?: boolean }) => {
        const task = tasks.find(t => t.id === id);
        if (!task) throw new Error('Task not found');
        if (title !== undefined) task.title = title;
        if (done !== undefined) task.done = done;
        return task;
      },
    },
  };
  
  export default resolvers;