# Health check
GET http://localhost:3000/
HTTP/1.1 200
[Asserts]
jsonpath "$.status" == "ok"

# Create a new todo
POST http://localhost:3000/todos
Content-Type: application/json

{
  "task": "Test Hurl",
  "done": false
}
HTTP/1.1 201
[Asserts]
jsonpath "$.task" == "Test Hurl"
jsonpath "$.done" == false

[Captures]
todo-id: jsonpath "$.id"

# List all todos
GET http://localhost:3000/todos
HTTP/1.1 200
[Asserts]
jsonpath "$.count" > 0

# Update a todo
PUT http://localhost:3000/todos/{{todo-id}}
Content-Type: application/json

{
  "task": "Updated Task",
  "done": true
}
HTTP/1.1 200
[Asserts]
jsonpath "$.task" == "Updated Task"
jsonpath "$.done" == true

# Toggle a todo's done status
PATCH http://localhost:3000/todos/{{todo-id}}/toggle
HTTP/1.1 200
[Asserts]
jsonpath "$.done" == false

# Mark all todos as done
POST http://localhost:3000/todos/complete-all
HTTP/1.1 200
[Asserts]
jsonpath "$.message" == "All todos marked as done"

# Delete a todo
DELETE http://localhost:3000/todos/{{todo-id}}
HTTP/1.1 204
