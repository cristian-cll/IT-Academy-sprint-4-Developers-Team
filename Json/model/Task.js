
module.exports = class Task {

    constructor({ name, description, user }) {
        this.uid = Math.random().toString(16);
        this.name = name;
        this.description = description;
        this.status = "to-do";
        this.startDate = new Date();
        this.finishedDate = null;
        this.user = user;
    }
};