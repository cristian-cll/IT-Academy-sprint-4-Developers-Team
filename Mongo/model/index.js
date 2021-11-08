require('dotenv').config();


// require mongoose
const mongoose = require("mongoose");

// map global promises
mongoose.Promise = global.Promise;

// connect to db
mongoose.connect("mongodb://localhost:27017/taskcli", {
	/*  useMongoClient: true, */
});

// import task model
const Task = require("./task");

// add task
const addTask = async (task) => {
	try {
		const newTask = await Task.create(task);
		if (newTask) {
			console.info("New Task Added");
			mongoose.connection.close();
		} else {
			console.error("Error adding task");
		}
	} catch (error) {
		console.error(error);
	}
};

// update task
const updateTask = async (_id, task) => {
	try {
		task && task.status === "finished"
			? task['finishedDate'] = Date.now()
			: task['finishedDate'] = null;
		const updatedTask = await Task.updateOne({ _id }, task);
		if (updatedTask) {
			console.info("Task Updated");
			mongoose.connection.close();
		} else {
			console.error("Error updating task");
		}
	} catch (error) {
		console.error(error);
	}
};

// update task
const removeTask = async (_id) => {
	try {
		const removeTask = await Task.deleteOne({ _id });
		if (removeTask) {
			console.info("Task removed from database");
			mongoose.connection.close();
		} else {
			console.error("Error removing task");
		}
	} catch (error) {
		console.error(error);
	}
};

// list all tasks in db
const listTasks = async () => {
	try {
		const allTasks = await Task.find();
		if (allTasks) {
			console.info(allTasks);
			console.info(`${allTasks.length} matches returned.`);
			mongoose.connection.close();
		} else {
			console.error("error listing all tasks");
		}
	} catch (error) {
		console.error(error);
	}
};

// find task
const findTask = async (name) => {
	try {
		const search = new RegExp(name, "i");
		const foundTask = await Task.find({
			$or: [{ name: search }, { description: search }],
		});
		if (foundTask) {
			console.info(foundTask);
			console.info(`${foundTask.length} matches`);
			mongoose.connection.close();
		} else {
			console.error("Error finding task");
		}
	} catch (error) {
		console.error(error);
	}
};

// export all methods
module.exports = {
	addTask,
	findTask,
	updateTask,
	removeTask,
	listTasks,
};