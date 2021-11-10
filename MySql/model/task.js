const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
	const attributes = {

		uid: { 
			type: DataTypes.STRING, 
			allowNull: false,
			defaultValue: Math.random().toString(16)
		},
		name: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING, allowNull: false },
		status: {
			type: DataTypes.ENUM("to-do", "in-progress", "finished"),
			defaultValue: "to-do",
		},
		startDate: {
			type: DataTypes.DATE,
			defaultValue: new Date().toISOString().slice(0, 19).replace("T", " "),
		},
		finishedDate: { type: DataTypes.DATE },
		user: { type: DataTypes.STRING, allowNull: false }
		
	};

  return sequelize.define("Task", attributes);
}
