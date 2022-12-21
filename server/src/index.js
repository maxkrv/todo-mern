require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");

const MONGO_URL = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.sqidaud.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const start = async () => {
	try {
		await mongoose.set("strictQuery", false);
		await mongoose.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => {
			console.log("Server is listening on port " + PORT);
		});
	} catch (err) {
		console.log(err);
	}
};
start();
