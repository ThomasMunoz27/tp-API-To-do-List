
const Task = require("../models/Task")

const getAllTasks = (req, res) => {
    Task.find()
    .then((tareas) => {
        res.status(200).json(tareas)
    })
    .catch((err) => {
        console.error("Error al obtener tareas", err)
        res.status(500).json({message: "Error al obtener tareas"})
    })
}

const getTaskById = async (req, res) => {
    await Task.findById(req.params.id)
    .then((tarea) => {
        if(!tarea) return res.status(404).json({message: "Tarea no encontrada"})
        res.json(tarea)
    })
    .catch((err) => {
        console.error("Error al obtener tarea", err)
        res.status(500).json({message: "Error al obtener tarea"})
    })
}

const postTask = async(req, res) => {
    try{

        const newTask = new Task(req.body)
        const tareaGuardada = await newTask.save()
    
        res.status(201).json(tareaGuardada)
    }catch (err){
        console.error("Error al crear la tarea", err)
        res.status(500).json({ message: "Error al crear la tarea" });
    }
    
}

const putTask = async (req, res) => {
    try{
        const updatedTask =await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
            )
        
        if(!updatedTask) return res.status(404).json({message: "Tarea no encontrada"})
        res.status(200).json(updatedTask)

    }catch (err){
        console.error("Error al actualizar la tarea", err)
        res.status(500).json({ message: "Error al actualizar la tarea" });
    }
    
}

const deleteTask = async (req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id)

        if(!deletedTask) return res.status(404).json({message: "Tarea no encontrada"})
        res.json({message: "Tarea eliminada"})
    }catch (err){
        console.error("Error al eliminar la tarea", err)
        res.status(500).json({ message: "Error al eliminar la tarea" });
    }
}

module.exports = {getAllTasks, getTaskById, postTask, putTask, deleteTask}