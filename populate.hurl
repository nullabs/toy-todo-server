# Create todo: Learn Hurl (done)
POST http://localhost:3000/todos
Content-Type: application/json

{
  "task": "Learn Hurl",
  "done": true
}
HTTP/1.1 201

# Create todo: Add proper logging (not done)
POST http://localhost:3000/todos
Content-Type: application/json

{
  "task": "Add proper logging",
  "done": false
}
HTTP/1.1 201

# Create todo: Write tests (done)
POST http://localhost:3000/todos
Content-Type: application/json

{
  "task": "Write tests",
  "done": true
}
HTTP/1.1 201

# Create todo: Deploy to production (not done)
POST http://localhost:3000/todos
Content-Type: application/json

{
  "task": "Deploy to production",
  "done": false
}
HTTP/1.1 201
