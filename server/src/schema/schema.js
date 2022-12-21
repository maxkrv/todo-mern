const mongoose = require("mongoose");

const Todo = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	sub_id: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Todo", Todo);
