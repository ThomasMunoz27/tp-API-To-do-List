const express = require("express");

const Sprint = require("../models/Sprint")
const Task = require("../models/Task");
const { getSprints, getSprint, postSprint, putSprint, deleteSprint, putTaskInSprint } = require("../controllers/sprintController");

const sprintRouter = express.Router();

sprintRouter.get("/sprints", getSprints)

sprintRouter.get("/sprints/:id", getSprint)

sprintRouter.post("/sprints", postSprint)

sprintRouter.put("/sprints/:id", putSprint)

sprintRouter.delete("/sprints/:id", deleteSprint)

sprintRouter.put("/sprints/:id/add-task/:taskId", putTaskInSprint)

module.exports = sprintRouter