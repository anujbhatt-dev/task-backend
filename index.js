const express= require("express")
const app = express()
require('dotenv').config()
const cors = require("cors")
app.use(cors())
const PORT = process.env.PORT || 3001 ;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("./dbConnect")
const UserRouter = require("./routes/userRoute")
const TaskRouter = require("./routes/taskRoute")


app.use("/api/user",UserRouter);
app.use("/api/task",TaskRouter);




app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})