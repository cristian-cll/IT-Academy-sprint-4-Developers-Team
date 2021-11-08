const fs = require("fs");
const fileStorage = './model/fileStorage.json'


// add task
async function addTask(task) {
	try {

		const id = Math.random().toString(16); 				
		const idTask = Object.assign({"_id":id}, task);		

		const storage = fs.readFileSync(fileStorage);	    
		const jsStorage = JSON.parse(storage)				
		jsStorage.data.push(idTask);						
		const newJsStorage = JSON.stringify(jsStorage);		

		fs.writeFileSync(fileStorage, newJsStorage, 'utf-8');  
			if (newJsStorage) {
					console.info("New Task Added");
			} else {
					console.error("Error adding task");
			}

	} catch (error) {
		console.error(error);
	}
}

// update task
async function updateTask(_idUser, task) {
	try {

		const idTask = Object.assign({"_id":_idUser}, task);
		const storage = fs.readFileSync(fileStorage);
		const jsStorage = JSON.parse(storage);
	

		const oldTask = jsStorage.data.find(element => element._id === _idUser);
		const oldTaskIndex = jsStorage.data.indexOf(oldTask);
		jsStorage.data.splice(oldTaskIndex, 1)
		jsStorage.data.push(idTask);
		
		const newJsStorage = JSON.stringify(jsStorage);

		fs.writeFileSync(fileStorage, newJsStorage, 'utf-8');
			if (newJsStorage) {
				console.info("Task Updated");
			} else {
				console.error("Error updating task");
			}

	} catch (error) {
		console.error(error);
	}
};

// remove task
async function removeTask(_idUser) {
	try {

		const storage = fs.readFileSync(fileStorage);
		const jsStorage = JSON.parse(storage);

		const findTask = await jsStorage.data.find(element => element._id === _idUser);
		const oldTaskIndex = await jsStorage.data.indexOf(findTask);
		jsStorage.data.splice(oldTaskIndex, 1)

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
		const jsStorage = JSON.parse(storage);
			
		if (jsStorage) {
			console.log(jsStorage);
			console.info(`${jsStorage.data.length} matches returned.`);
		} else {
			console.error("error listing all tasks");
		}

	} catch (error) {
		console.error(error);
	}
};

// find task
async function findTask (findUser) {
	try {
		const storage = fs.readFileSync(fileStorage);
		const jsStorage = JSON.parse(storage)
		const taskFind = jsStorage.data.filter( (element) => element.user === findUser);
	
		if (taskFind) {
			console.log(taskFind);
			console.log(`${taskFind.length} matches`);
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

