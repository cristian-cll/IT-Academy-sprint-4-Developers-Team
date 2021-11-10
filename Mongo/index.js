const { mongoConfig } = require("../databaseConfig");
const { host, port, database } = mongoConfig;

// require mongoose
const mongoose = require("mongoose");

// map global promises
mongoose.Promise = global.Promise;

// connect to db
mongoose.connect(`mongodb://${host}:${port}/${database}`, {
	/*  useMongoClient: true, */
});

// import task model
const Task = require("./model/task");

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
const updateTask = async (idTask, task) => {
	try {
		const isTaskExist = await Task.find({uid : idTask})

		if(!isTaskExist) return;

		task && task.status === "finished"
			? task['finishedDate'] = Date.now()
			: task['finishedDate'] = null;
		const updatedTask = await Task.updateOne({ uid: idTask }, task);
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
		const removeTask = await Task.deleteOne({ uid: _id });
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
		
		const list = await Task.find();
		mongoose.connection.close();
		return list;

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
		mongoose.connection.close();
		return foundTask;

	} catch (error) {
		console.error(error);
	}
};

// find task by id
const findById = async (idTask) => {
	try {

		const taskFound = await Task.find({uid: idTask});
		if(taskFound.length > 0) return taskFound;

		console.log("Does not exist this id");
		return null;

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
	findById
};