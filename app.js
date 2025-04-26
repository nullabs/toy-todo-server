import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret';
const ENDPOINTS = [
  { method: 'GET', path: '/', description: 'Health check & status' },
  { method: 'GET', path: '/todos', description: 'List todos (optional: ?done=true, ?q=search)' },
  { method: 'POST', path: '/todos', description: 'Create a new todo' },
  { method: 'PUT', path: '/todos/:id', description: 'Update a todo by ID' },
  { method: 'PATCH', path: '/todos/:id/toggle', description: 'Toggle a todo\'s done status' },
  { method: 'POST', path: '/todos/complete-all', description: 'Mark all todos as done' },
  { method: 'DELETE', path: '/todos/:id', description: 'Delete a todo' },
  { method: 'GET', path: '/help', description: 'List all API endpoints' },
];

// In-memory todos store
let todos = [];

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('common'));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Routes
app.get('/', (req, res) => res.json({
  status: 'ok',
  env: process.env.NODE_ENV,
  todos: todos.length,
  secret: SECRET_KEY.slice(0, 4) + '***'
}));

app.get('/todos', (req, res) => {
  let filtered = [...todos];
  if (req.query.done) {
    const done = req.query.done === 'true';
    filtered = filtered.filter(t => t.done === done);
  }
  if (req.query.q) {
    const q = req.query.q.toLowerCase();
    filtered = filtered.filter(t => t.task.toLowerCase().includes(q));
  }
  res.json({ count: filtered.length, data: filtered });
});


app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task is required' });
  const todo = {
    id: Date.now(),
    task,
    done: typeof req.body.done === 'boolean' ? req.body.done : false
  };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch('/todos/:id/toggle', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  todo.done = !todo.done;
  res.json(todo);
});

app.post('/todos/complete-all', (req, res) => {
  todos = todos.map(t => ({ ...t, done: true }));
  res.json({ message: 'All todos marked as done' });
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task, done } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  if (task !== undefined) todo.task = task;
  if (done !== undefined) todo.done = done;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).end();
});

app.get('/help', (req, res) => {
  res.json({
    ENDPOINTS
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📖 Available endpoints:`);
  console.table(ENDPOINTS);
});
