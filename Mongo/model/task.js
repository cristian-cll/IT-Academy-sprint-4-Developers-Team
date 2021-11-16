const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
	{
		uid: { 
			type: String,
			default: Math.random().toString(16)
		},
		name: { type: String },
		description: { type: String },
		status: { 
			type: String,
			enum: ['to-do', 'in-progress', 'finished'],
			default: "to-do" 
		},
		startDate: { type: Date, default: Date.now() },
		finishedDate: { type: Date },
		user: { type: String }
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Task", taskSchema);