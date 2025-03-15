const { request, gql } = require('graphql-request');

// Define the GraphQL endpoint (your server)
const endpoint = 'http://localhost:4000';

// GraphQL queries and mutations
const queries = {
  // Query to list all tasks
  listTasks: gql`
    query {
      tasks {
        id
        title
        done
      }
    }
  `,

  // Query to fetch a specific task by ID
  getTask: gql`
    query GetTask($id: ID!) {
      task(id: $id) {
        id
        title
        done
      }
    }
  `,

  // Mutation to create a new task
  createTask: gql`
    mutation CreateTask($title: String!) {
      createTask(title: $title) {
        id
        title
        done
      }
    }
  `,

  // Mutation to update a task
  updateTask: gql`
    mutation UpdateTask($id: ID!, $title: String, $done: Boolean) {
      updateTask(id: $id, title: $title, done: $done) {
        id
        title
        done
      }
    }
  `,
};

// Function to execute a GraphQL request
async function runClient() {
  try {
    // Create a new task
    const createVariables = { title: "Learn GraphQL" };
    const createData = await request(endpoint, queries.createTask, createVariables);
    console.log("Created Task:", createData.createTask);
    const newTaskId = createData.createTask.id;

    // List all tasks
    const tasksData = await request(endpoint, queries.listTasks);
    console.log("All Tasks:", tasksData.tasks);

    // Fetch the created task
    const getVariables = { id: newTaskId };
    const getData = await request(endpoint, queries.getTask, getVariables);
    console.log("Fetched Task:", getData.task);

    // Update the task
    const updateVariables = { id: newTaskId, done: true };
    const updateData = await request(endpoint, queries.updateTask, updateVariables);
    console.log("Updated Task:", updateData.updateTask);

  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the client
runClient();