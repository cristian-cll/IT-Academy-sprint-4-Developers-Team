const fs = require("fs");
const path = require('path');
const fileStorage = path.join(__dirname, '/fileStorage.json');
const Task = require("./model/Task");


// add task
async function addTask(task) {
	try {

		const newTask = new Task(task)
		
		const storage = fs.readFileSync(fileStorage);	    
		const jsStorage = JSON.parse(storage);				
		jsStorage.push(newTask);						
		const newJsStorage = JSON.stringify(jsStorage);		

		fs.writeFileSync(fileStorage, newJsStorage, 'utf-8');  
		newJsStorage ? console.info("New Task Added") : console.error("Error adding task");

	} catch (error) {
		console.error(error);
	}
}

// update task
async function updateTask(idTask, task) {
	try {

		const datajson = fs.readFileSync(fileStorage);
		var data = JSON.parse(datajson);

		const taskFound = data.find(task => task.uid === idTask);
		if(!taskFound) return;

		taskFound.name = task.name;
		taskFound.description = task.description;
		taskFound.status = task.status;
		task.status === "finished" ? taskFound['finishedDate'] = Date.now() : taskFound['finishedDate'] = null;

		const taskFoundIndex = data.indexOf(taskFound);
		
		data.splice(taskFoundIndex, 1);
		data.push(taskFound);

		const newData = JSON.stringify(data);

		fs.writeFileSync(fileStorage, newData, 'utf-8');
		
		newData ? console.info("Task Updated") : console.error("Error updating task");


	} catch (error) {
		console.error(error);
	}
};

// remove task
async function removeTask(_idUser) {
	try {

		const storage = fs.readFileSync(fileStorage);
		const jsStorage = JSON.parse(storage);

		const findTask = await jsStorage.find(element => element._id === _idUser);
		const oldTaskIndex = await jsStorage.indexOf(findTask);
		jsStorage.splice(oldTaskIndex, 1)

		const newJsStorage = JSON.stringify(jsStorage);

		fs.writeFileSync(fileStorage, newJsStorage, 'utf-8');
		if (newJsStorage) {
			console.log("Task removed from database");
		} else {
			console.error("Error removing task");
		}

	} catch (error) {
		console.error(error);
	}
};

// list all tasks in db
async function listTasks() {

	try {

		const storage = fs.readFileSync(fileStorage);
		return JSON.parse(storage);

	} catch (error) {
		console.error(error);
	}
};

// find task
async function findTask (findUser) {
	try {
		const storage = fs.readFileSync(fileStorage);
		const jsStorage = JSON.parse(storage)
		const taskFind = jsStorage.filter( (element) => element.name === findUser);

		return taskFind;
	
	} catch (error) {
		console.error(error);
	}
};


// find task by id
const findById = async (idTask) => {
	try {

		const datajson = fs.readFileSync(fileStorage);
		var data = JSON.parse(datajson);

		const taskFound = data.find(task => task.uid === idTask);
		if(taskFound) return taskFound;
		
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