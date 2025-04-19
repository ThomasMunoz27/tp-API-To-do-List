const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
        title: {type: String,
                required: true
        },
        description: String,
        estado: {type: String,
                enum: ["pendiente", "en progreso", "completada"],
                default: "pendiente"
    },
    fechaLimite: {type: Date,
                required: true
    }
})

module.exports =  mongoose.model("Task", taskSchema)