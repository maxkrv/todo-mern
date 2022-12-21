import axios from "axios";

const BACKEND_URL =
	process.env.NODE_ENV === "production"
		? `${process.env.REACT_APP_BACKEND_URL}/api`
		: "http://localhost:5000/api";

class TodoService {
	static async getTodos(sub_id) {
		const response = await axios.get(BACKEND_URL + "/todos", {
			params: {
				sub_id,
			},
		});

		return response.data;
	}

	static async createTodo({ title, completed, sub_id }) {
		const response = await axios.post(BACKEND_URL + "/todo", {
			title,
			completed,
			sub_id,
		});

		return response.data;
	}

	static async updateTodo({ title, completed, id }) {
		const response = await axios.put(BACKEND_URL + `/todo/${id}`, {
			title,
			completed,
		});

		return response.data;
	}

	static async deleteTodoById(id) {
		const response = await axios.delete(BACKEND_URL + `/todo/${id}`);

		return response.data;
	}
}

export default TodoService;
