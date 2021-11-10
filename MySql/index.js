const initialize = require('./db');

async function addTask(task) {
    const db = await initialize()
    await db.User.create(task)
        .then(() => console.log('New task created'))
        .catch(err => console.log(err.message))
}


async function updateTask(idTask, task) {
    const db = await initialize()
    const newTask = {}
    for (let item in task) {
        if (task[item]) {
            newTask[item] = task[item]
        }
    }

    task && task.status === "finished" 
    ? newTask.finishedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    : newTask.finishedDate = null;
    


    await db.User.update({ ...newTask }, { where: { uid: idTask } })
        .then(() => console.log("Task Updated"))
        .catch(err => console.log(err));

    return
}

async function removeTask(idTask) {
    const db = await initialize()
    await db.User.destroy({ where: { uid: idTask } })
        .then(() => console.log("Task removed from database"))
        .catch(err => console.log(err));

}


async function listTasks() {
    const db = await initialize()
    try {
        return await db.User.findAll({ raw: true });
    } catch (error) {
        console.log(error)
    }
}


async function findTask(name) {
    const db = await initialize()
    try {
        return await db.User.findAll(
            {
                raw: true,
                where: {
                    name: name,
                },
            },
        );
    } catch (error) {
        console.log(error)
    }
}


// find task by id
const findById = async (idTask) => {
    const db = await initialize()
	try {

        const taskFound = await db.User.findAll(
            {
                raw: true,
                where: { 
                    uid: idTask, 
                },  
            }
        )

		if(taskFound.length > 0) return taskFound;

		console.log("Does not exist this id");
		return null;

	} catch (error) {
		console.error(error);
	}
};

module.exports = {
    addTask,
    updateTask,
    removeTask,
    listTasks,
    findTask,
    findById
}