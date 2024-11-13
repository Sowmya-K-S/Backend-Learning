//fs module
const fs = require("fs");

//path of file on which we are trying to work on
const filePath = "./tasks.json"

//Methods to accomplish different tasks as said in command

//to load preexisting tasks from file
let loadTasks = () => {
    try
    {
        let dataBuffer = fs.readFileSync(filePath); //stores data from data buffer 
        console.log("Buffer data: "+dataBuffer)
        let dataJSON = dataBuffer.toString(); //converts it into dataJSON
        console.log("dataJSON: "+dataJSON)
        return JSON.parse(dataJSON); //dataJSON is converted to array
    }
    catch(error)
    {
        return []; //if file soesnot exists or doesnot have any data in it .. then return empty array.
    }
    
}

// to save tasks in file after changes are made
let saveTasks = (taskArray) => {
    let dataJSON = JSON.stringify(taskArray);
    fs.writeFileSync(filePath, dataJSON);
}

// to add a new file
let addTask = (task) => {
    let taskArray = loadTasks();
    console.log("Task Array: ")
    console.log(taskArray);
    taskArray.push({task});
    saveTasks(taskArray);
    console.log(`Task added -> ${task}`);
    console.log(taskArray);
}

// to list all the tasks
let displayTasks = () => {
    let taskArray = loadTasks();
    taskArray.forEach((element, index) => {
        console.log(`${index+1} -> ${element.task}`);
    })
}

//to delete a task
let deleteTask = (index) => {
    let taskArray = loadTasks();
    let taskArray_Modified = taskArray.filter((element, indx) => {
        return indx !== (index-1);
    })
    saveTasks(taskArray_Modified);
}

 
//process.argv  -> gives array of command line arguments
//grab command and arguement from command line using array indexes
let command = process.argv[2];
let arguement = process.argv[3];


//conditions to execute respective functions based on command and argument value
if(command === 'add')
    addTask(arguement);
else if(command === 'display')
    displayTasks();
else if(command === 'delete')
    deleteTask(arguement);
else
    console.log("Command not found");
