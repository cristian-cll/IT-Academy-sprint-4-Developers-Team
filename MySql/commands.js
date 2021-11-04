#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");
const { addTask, findTask, updateTask, removeTask, listTasks } = require("./model/index");

// create task questions
const newTaskQuestions = [
	{
		type: "input",
		name: "name",
		message: "What is the name of the task?",
	},
	{
		type: "input",
		name: "description",
		message: "What is the task description?",
	},
	{
		type: "input",
		name: "user",
		message: "What is your name?",
	},
];

// edit task questions
const ediTaskQuestions = [
	{
		type: "input",
		name: "name",
		message: "What is the new name of the task?",
	},
	{
		type: "input",
		name: "description",
		message: "What is the new task description?",
	},
	{
		name: "status",
		type: "rawlist",
		message: "change the status",
		choices: ["to-do", "in-progress", "finished"]
	}
];


program.version("0.0.1").description(
`
	 _______        _       _____        _ _ 
	|__   __|      | |     / ____|      | (_)
	   | | __ _ ___| | __ | |   ______  | |_ 
	   | |/ _\` / __| |/ / | |  |______| | | |
	   | | (_| \\__ |   <  | |____       | | |
	   |_|\\__,_|___|_|\\_\\  \\_____|      |_|_|
				Task Command Line						 
`
);


// add command
program
	.command("add")
	.alias("a")
	.description("Add a task to database")
	.action(() => {
		prompt(newTaskQuestions).then((answers) => addTask(answers));
	});

// find command
program
	.command("find <name>")
	.alias("f")
	.description("Find a task in the database.")
	.action((name) => findTask(name));

// list command
program
	.command("list")
	.alias("l")
	.description("List all tasks in database.")
	.action(() => listTasks());

// update command
program
	.command("update <_id>")
	.alias("u")
	.description("updated a task in the database")
	.action((_id) => {

		prompt(ediTaskQuestions).then((answers) => updateTask(_id, answers))

	})


// delete command
program
	.command("delete <_id>")
	.alias("d")
	.description("Remove a task from the database.")
	.action((_id) => removeTask(_id));

// help command
program
	.command("help")
	.alias("h")
	.description("Some help")
	.action(() => {
		console.info(`use the 'task-cli' command followed by whatever function or alias you want. \ne.g. 'task-cli add' or 'task-cli a'`)
		process.exit(0)
	});




program.parse(process.argv);