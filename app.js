require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const taskRouter = require("./routes/tasks")
const backlogRouter = require("./routes/backlog");
const sprintRouter = require("./routes/sprints");


const app = express();
app.use(express.json());


const mongoURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017/?authSource=admin`


mongoose.connect(mongoURL).then(() => console.log("✔ conectado a mongoDB")).catch((err) => console.error("❌ Error al conectar a MongoDB", err))

const db = mongoose.connection;

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})

app.use("/", taskRouter)
app.use("/", backlogRouter)
app.use("/", sprintRouter)


