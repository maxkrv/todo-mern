const express = require("express");
const TodoController = require("./controllers/todoController.js");

const router = express.Router();

router.get("/todos", TodoController.getTodos);
router.post("/todo", TodoController.createTodo);
router.get("/todo/:id", TodoController.getTodoById);
router.put("/todo/:id", TodoController.updateTodoById);
router.delete("/todo/:id", TodoController.deleteTodoById);

module.exports = router;
