const Todo = require("../schema/schema");

class TodoController {
	async getTodos(req, res) {
		try {
			const todos = await Todo.find({ sub_id: req.query.sub_id });

			return res.json(todos);
		} catch (err) {
			res.status(500).send;
		}
	}
	async getTodoById(req, res) {
		try {
			if (!req.params.id) {
				return res.status(400).json({ message: "Id not found" });
			}

			const todo = await Todo.findById(req.params.id);

			return res.json(todo);
		} catch (err) {
			res.status(500).send;
		}
	}
	async createTodo(req, res) {
		try {
			const todo = new Todo({
				title: req.body.title,
				completed: req.body.completed,
				sub_id: req.body.sub_id,
			});
			await todo.save();

			return res.json(todo);
		} catch (err) {
			res.status(500).send;
		}
	}
	async updateTodoById(req, res) {
		try {
			if (!req.params.id) {
				return res.status(400).json({ message: "Id not found" });
			}

			const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});

			return res.json(todo);
		} catch (err) {
			res.status(500).send;
		}
	}
	async deleteTodoById(req, res) {
		try {
			if (!req.params.id) {
				return res.status(400).json({ message: "Id not found" });
			}

			const todo = await Todo.findByIdAndDelete(req.params.id);

			return res.json(todo);
		} catch (err) {
			res.status(500).send;
		}
	}
}

module.exports = new TodoController();
