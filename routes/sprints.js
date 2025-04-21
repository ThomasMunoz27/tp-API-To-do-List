const express = require("express");

const Sprint = require("../models/Sprint")
const Task = require("../models/Task");
const { getSprints, getSprint, postSprint, putSprint } = require("../controllers/sprintController");

const sprintRouter = express.Router();

sprintRouter.get("/sprints", getSprints)

sprintRouter.get("/sprints/:id", getSprint)

sprintRouter.post("/sprints", postSprint)

sprintRouter.put("/sprints/:id", putSprint)

sprintRouter.delete("/sprints/:id", putTaskInSprint)

sprintRouter.put("/sprints/:id/add-task/:taskId", async (req, res) => {
    try{
        const sprintId = req.params.id.trim();  
        const taskId = req.params.taskId.trim();

        const sprint = await Sprint.findById(sprintId)
        if(!sprint) return res.status(400).json({message: "sprint no encontrada"})
        
        const task = await Task.findById(taskId)
        if (!task) return res.status(404).json({message: "tarea no encontrada"})
            
        if(sprint.tareas.includes(task._id)){
            return res.status(400).json({message: "La tarea ya está en el sprint"})
        }

        sprint.tareas.push(task._id)
        await sprint.save()
        res.status(200).json({message: "tarea agregada a la sprint"})
    }catch (err) {
        console.error("Error al agregar tarea a la sprint", err);
        res.status(500).json({message: "Error al agregar tarea a la sprint "})
        
    }
})

module.exports = sprintRouter