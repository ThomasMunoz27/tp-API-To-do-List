const express = require("express");

const Sprint = require("../models/Sprint")
const Task = require("../models/Task")

const sprintRouter = express.Router();

sprintRouter.get("/sprints", async (req, res) => {
    try{
        const sprints = await Sprint.find().populate("tareas")
        res.status(200).json(sprints)
    }catch(err) {
        console.error("Error al obtener sprints", err)
        res.status(400).json({message: "Error al obtener sprints"})
    }
})

sprintRouter.get("/sprints/:id", async (req, res) => {
    try{
        const sprint = await Sprint.findById(req.params.id).populate("tareas")
        if(!sprint) return res.status(404).json({message: "Sprint no encontrado"})
        res.status(200).json(sprint)
    }catch (err){
        console.error("Error al obtener sprints", err)
        res.status(400).json({message: "Error al obtener sprints"})
    }
})

sprintRouter.post("/sprints", async (req, res) => {
    try{
        const newSprint = new Sprint(req.body)
        if(!newSprint) return res.status(404).json({message: "Sprint no encontrado"})
        const sprintGuardada = await newSprint.save()
        res.status(201).json(sprintGuardada)
    }catch(err) {
        console.error("Error al obtener sprints", err)
        res.status(400).json({message: "Error al obtener sprints"})
    }
})

sprintRouter.put("/sprints/:id", async (req, res) => {
    try{
        const updatedSprint = await Sprint.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        )
        if(!updatedSprint) return res.status(404).json({message: "Sprint no encontrado"})
        res.status(200).json(updatedSprint)
    }catch (err) {
        console.error("Error al obtener sprints", err)
        res.status(400).json({message: "Error al obtener sprints"})
    }
})

sprintRouter.delete("/sprints/:id", async (req, res) => {
    try{
        const deletedSprint = await Sprint.findByIdAndDelete(req.params.id)

        if(!deletedSprint) return res.status(404).json({message: "Sprint no encontrado"})
        res.status(200).json({message: "Sprint eliminado"})
    }catch (err) {
        console.error("Error al borrar sprint", err)
        res.status(500).json({message: "Error al borrar sprint"})
    }
})

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