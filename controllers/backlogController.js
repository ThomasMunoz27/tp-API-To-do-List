const Backlog = require("../models/Backlog")

const Task = require("../models/Task")

const getBacklog = async (req, res) => {
    try{
        const backlog = await Backlog.findOne().populate("tareas")
        if(!backlog) return res.status(404).json({message: "Backlog no encontrado"})
        res.status(200).json(backlog)
    }catch(err) {
        res.status(500).json({error: err.message})
    }}

    const postBacklog = async (req, res) => {
    
        try{
            let backlog = await Backlog.findOne()
            if(backlog){
                return res.status(400).json({message: "El backlog ya existe"})
            }
            backlog = new Backlog()
    
            await backlog.save()
            res.status(200).json(backlog)
            
        }catch(err) {
            res.status(500).json({error: err.message})
        }
        }

        const putBacklog = async (req, res) => {
            const {taskId} = req.params
            try{
                const backlog =  await Backlog.findOne()
                if(!backlog){
                    return res.status(400).json({messaje: "Backlog no encontrado"})
                }
        
                const task = await Task.findById(taskId)
                if(!task){
                    return res.status(404).json({message: "Tarea no encontrada"})
                }
        
                backlog.tareas.push(task._id)
                await backlog.save()
        
                res.status(200).json({message: "Tarea agregada al backlog"})
            }catch (err) {
                console.error("Error al obtener tareas", err);
                res.status(500).json({ message: "Error al obtener tareas" });
                
            }
        }

    module.exports = {getBacklog, postBacklog, putBacklog}