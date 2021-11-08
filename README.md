## Task Command-line

Command line application to create, update, edit and delete tasks  
When you edit, you can finish a task. 
By default, the tasks are in an "to-do" status, you can edit them to "in-progress" or "finished".  
If you finish the task, an end date will be added.


### HOW TO INSTALL:

Choose the data persistence to use entering the corresponding folder.   
e.g (Bash, CMD or command prompt).  

```
cd mongo & npm install  
```
In PowerShell ( cd mongo; npm install )

### Basic configuration:
- Mongo   
You have to put your connection uri in Mongo / model / index.js   
... mongoose.connect("mongodb://localhost:27017/taskcli", ....
- Mysql   
You have to put your connection data in Mysql / .env.example   
and rename this file .env.example to .env


### HOW TO USE:
```
npm link
```
This 'means to symlink a package folder'. Put simply, it's a means to connect your parent application to a module you have locally on your machine. When you run the application, any changes you make to the dependency will be reflected in the application.

Now you can go to your terminal Bash, CMD, command prompt, etc and type:
```
task-cli
```

or directly whith Npx. Npx replaces the. node_modules/.bin (valid for PowerShell)

```
npx task-cli
```

and make use of the program



![Screenshot](screenshot.jpg)


You can use the command   
e.g
```
task-cli add
```
or alias   
e.g
```
task-cli a
```


---
>If you want to change the name of the command, use another instead of "task-cli", you must change the name in the package.json and do npm-link again.
