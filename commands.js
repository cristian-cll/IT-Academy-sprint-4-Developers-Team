#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");
const fs = require("fs");
const path = require('path');
const persistancePath = path.join(__dirname, '/persistance.json');
const { exit } = require("process");


const readJSON = (json) => JSON.parse(fs.readFileSync(json));
const writeJSON = (location, data) => fs.writeFileSync(location, data, 'utf-8'); 


// Read persistence json file and extract 'persistence' field
const { persistance } = readJSON(persistancePath);

let functions = {};

// Use the functions of a persistence according to the json readed before
switch(persistance) {
	case 'mysql': 
	functions = {addTask, findTask, updateTask, removeTask, listTasks, findById} = require('./MySql/index');
	break;
	case 'mongo': 
	functions = {addTask, findTask, updateTask, removeTask, listTasks, findById} = require('./Mongo/index');
	break;
	case 'json': 
	functions = {addTask, findTask, updateTask, removeTask, listTasks, findById} = require('./Json/index');
	break;
}

// Check that the persistence in the JSON cannot be null or another value
const isPersistenceValid = (field) => field === 'mysql' || field === 'json' || field === 'mongo' ? true : console.log("Choose a correctly database/persistence first!");


// QUESTIONS
// create task questions
const newTaskQuestions = [
	{
		type: "input",
		name: "name",
		message: "What is the name of the task?",
		validate: answer => !answer || /^ *$/.test(answer) ? "Please enter a name" : true,
	},
	{
		type: "input",
		name: "description",
		message: "What is the task description?",
		validate: answer => !answer || /^ *$/.test(answer) ? "Please enter a description" : true,
	},
	{
		type: "input",
		name: "user",
		message: "What is your name?",
		validate: answer => !answer || /^ *$/.test(answer) ? "Please enter an user" : true,
	},
];

// edit task questions
const ediTaskQuestions = [
	{
		type: "input",
		name: "name",
		message: "What is the new name of the task?",
		validate: answer => !answer || /^ *$/.test(answer) ? "Please enter a name" : true,
	},
	{
		type: "input",
		name: "description",
		message: "What is the new task description?",
		validate: answer => !answer || /^ *$/.test(answer) ? "Please enter a description" : true,
	},
	{
		name: "status",
		type: "rawlist",
		message: "change the status",
		choices: ["to-do", "in-progress", "finished"]
	}
];

// DTO
const mapper = (data) => {
	return data.map(task => ({
		ID_TAREA: task.uid,
		NOMBRE_TAREA: task.name, 
		DESCRIPCION: task.description,
		ESTADO_TAREA: task.status,
		FECHA_CREACION: new Date(task.startDate).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' }),
		FECHA_FINALIZACION : task.finishedDate ? new Date(task.finishedDate).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' }) : 'ACTIVA',
		CREADA_POR: task.user,
	}))
}

program
	.version("0.0.1")
	.description(
`
	 _______        _       _____        _ _ 
	|__   __|      | |     / ____|      | (_)
	   | | __ _ ___| | __ | |   ______  | |_ 
	   | |/ _\` / __| |/ / | |  |______| | | |
	   | | (_| \\__ |   <  | |____       | | |
	   |_|\\__,_|___|_|\\_\\  \\_____|      |_|_|
				Task Command Line			
----------------------------------
--> current persistence: ${persistance} <--
----------------------------------
`
);


// choose persistence command
program
	.command("persistance")
	.alias("p")
	.description("Choose persistance")
	.action( async () => {
		const answer = await prompt({
			name: "persistance",
			type: "rawlist",
			message: "Choose the persistance",
			choices: ["mongo", "mysql", "json"]
		})
		
		const jsonData = JSON.stringify(answer);
		writeJSON(persistancePath, jsonData);
		console.info("Switched to:", answer.persistance);
		exit(); 
	});

	
// add command
program
	.command("add")
	.alias("a")
	.description("Add a task to database")
	.action( async () => {
		isPersistenceValid(persistance) ? null : exit();
		const answer = await prompt(newTaskQuestions)
		await functions.addTask(answer)
		exit()
	});


// find command
program
	.command("find <name>")
	.alias("f")
	.description("Find a task in the database.")
	.action( async name => {
		isPersistenceValid(persistance) ? null : exit();
		const list = await findTask(name)
		console.log(mapper(list))
		console.log(`${list.length} matches returned.`)
		exit() 
   	});


// list command
program
	.command("list")
	.alias("l")
	.description("List all tasks in database.")
	.action( async () => {
		isPersistenceValid(persistance) ? null : exit();
	 	const list = await listTasks()
		console.log(mapper(list))
		console.log(`${list.length} matches returned.`)
	 	exit() 
	});
	

// update command
program
	.command("update <_id>")
	.alias("u")
	.description("updated a task in the database")
	.action( async (_id) => {
		isPersistenceValid(persistance) ? null : exit(0);
		const test = await findById(_id);
		test ?  null : exit(0);
		const answers = await prompt(ediTaskQuestions);
		await functions.updateTask(_id, answers);
		exit()
	})


// delete command
program
	.command("delete <_id>")
	.alias("d")
	.description("Remove a task from the database.")
	.action( async (_id) => {
		isPersistenceValid(persistance) ? null : exit();
		const test = await findById(_id);
		test ?  null : exit(0);
		await removeTask(_id)
		exit()
	});

	
// help command
program
	.command("help")
	.alias("h")
	.description("Some help")
	.action(() => {
		console.info(`use the 'task-cli' command followed by whatever function or alias you want. \ne.g. 'task-cli add' or 'task-cli a'`)
		exit()
	});




program.parse(process.argv);