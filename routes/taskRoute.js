const express = require("express")
const { createTaskController, deleteTask, updateTask, getTasks } = require("../controllers/taskController")
const { verifyToken } = require("../middleware/verifyToken")
const router = express.Router()

router.post("/create",verifyToken,createTaskController)
router.get("",verifyToken,getTasks)
router.delete("/:id",verifyToken,deleteTask)
router.patch("/:id",verifyToken, updateTask)


module.exports = router