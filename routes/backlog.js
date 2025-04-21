const express = require("express");
const Backlog = require("../models/Backlog");
const { getBacklog, postBacklog, putBacklog } = require("../controllers/backlogController");

const backlogRouter = express.Router();



backlogRouter.get("/backlog",getBacklog)


backlogRouter.post("/backlog", postBacklog)

backlogRouter.put("/backlog/add-task/:taskId", putBacklog
    
)
module.exports = backlogRouter