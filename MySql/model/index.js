const initialize = require('./db')

async function addTask(task) {
    const db = await initialize()
    await db.User.create(task)
        .then(() => console.log('New task created'))
        .catch(err => console.log(err.message))
}

async function updateTask(id, task) {
    const db = await initialize()
    const newTask = {}
    for (let item in task) {
        if (task[item]) {
            newTask[item] = task[item]
        }
    }

    if (task && task.status === "finished") {
        newTask.finishedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    }


    await db.User.update({ ...newTask }, { where: { id } })
        .then(() => console.log("Task Updated"))
        .catch(err => console.log(err));

    return
}

async function removeTask(id) {
    const db = await initialize()
    await db.User.destroy({ where: { id } })
        .then(() => console.log("Task removed from database"))
        .catch(err => console.log(err));

}


async function listTasks() {
    const db = await initialize()
    await db.User.findAll({ raw: true })
        .then((res) => {
            console.log(res)
            console.log(`${res.length} matches returned.`)
        })
        .catch(err => console.log(err))

}


async function findTask(name) {
    const db = await initialize()
    db.User.findAll(
        {
            raw: true,
            where: {
                name: name,
            },
        },

    ).then((res) => {
        console.log(res)
        console.log(`${res.length} matches`);
    }).catch(err => console.log(err))
}

module.exports = {
    addTask,
    updateTask,
    removeTask,
    listTasks,
    findTask,
}