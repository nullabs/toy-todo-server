# toy-todo-server

![Node.js](https://img.shields.io/badge/Node.js-22.x-blue)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/suft/toy-todo-server/build.yml)
![License](https://img.shields.io/badge/license-MIT-yellow)

A minimalistic toy API server for managing todos, built with [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/).
This server supports basic CRUD operations for todos, logging, environment configuration, and health checks.

### 🛠️ Dependencies
- [`Node.js`](https://nodejs.org/) (with [`Express`](https://expressjs.com/))
- [`Yarn`](https://yarnpkg.com/) (for package management)
- [`Alpine Linux`](https://alpinelinux.org/) (for Docker container)
- [`Docker`](https://www.docker.com/) (for containerization)
- [`Tini`](https://github.com/krallin/tini) (for handling signals in Docker)
- [`Hurl`](https://hurl.dev/) (for populating todos and testing)
- [`Make`](https://www.gnu.org/software/make/) (for simplifying Docker operations)

### 🚀 How to Start the App

1. **Ensure prerequisites are installed**:
   - Install [`Docker`](https://www.docker.com/) and ensure it is running.
   - Install [`Make`](https://www.gnu.org/software/make/) (pre-installed on most Linux/macOS systems).

2. **Start the app**:
   Run the following command to build and start the app in a Docker container:
   ```bash
   make
   ```

3. **Access the app**:
   Once the app is running, open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### 🧪 Testing
To test the API, you can use [`Hurl`](https://hurl.dev/) or any API client like [Postman](https://www.postman.com/).

#### Populate Todos
You can use the `populate.hurl` file to populate the server with sample todos. This file contains predefined HTTP requests to create sample data.

Run the following command to execute `populate.hurl`:
```bash
hurl populate.hurl
```

#### Run Tests
To test the API endpoints, use the `test.hurl` file:
```bash
hurl --test test.hurl
```

Ensure the server is running before executing these commands.
