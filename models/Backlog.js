const mongoose = require("mongoose");

const backlogSchema = new mongoose.Schema({

    tareas: [{type: mongoose.Schema.Types.ObjectId, ref: "Task", default:[]}]
})

module.exports = mongoose.model("Backlog", backlogSchema)