const express = require("express");

const Task = require("../models/Task");
const { getAllTasks, getTaskById, postTask, putTask, deleteTask } = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.get("/tasks",  getAllTasks)

taskRouter.get("/tasks/:id", getTaskById)

taskRouter.post("/tasks", postTask) 

taskRouter.put("/tasks/:id", putTask )

taskRouter.delete("/tasks/:id", deleteTask)

module.exports = taskRouter