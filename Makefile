NAME = toy-todo-server
PORT = 3000
DEBUG_PORT = 9229

all:
	@echo "Building image..."
	docker build -t $(NAME) .
	@echo "Cleaning up dangling images..."
	docker image prune -f
	@echo "Starting container..."
	docker run -it --rm -p $(PORT):3000 -p $(DEBUG_PORT):9229 $(NAME)
