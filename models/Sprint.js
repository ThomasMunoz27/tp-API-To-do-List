const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema({

    fechaInicio: {type: String, required: true},
    fechaCierre: {type: String, required: true},
    tareas: [{type: mongoose.Schema.Types.ObjectId, ref: "Task", default:[]}]
})

module.exports = mongoose.model("Sprint", sprintSchema)