const TaskModel = require("../models/taskModel")
const mongoose =require("mongoose")

exports.createTaskController= async (req,res)=>{
    try {
        console.log(req.user);
        const newTask = await TaskModel.create(req.body)
        newTask.owner = req.user._id
        await newTask.save();
        res.status(201).send(newTask)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

exports.getTasks = async(req,res)=>{
    try{
        const tasks = await TaskModel.find({owner:req.user._id})
        if(!tasks){
            throw new Error("no tasks found")
        }
        res.status(200).send(tasks)
    }catch(error){
        res.status(400).send({error:error.message}) 
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).send({ error: 'Invalid task ID' });
        }

        const task = await TaskModel.findByIdAndDelete(taskId);

        if (!task) {
            throw new Error('Task does not exist');
        }

        res.status(204).send(); 
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).send({ error: 'Invalid task ID' })
        }

        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            req.body, 
            { new: true, runValidators: true } 
        );

        if (!updatedTask) {
            throw new Error('Task not found');
        }

        res.status(200).send(updatedTask);
    } catch (error) {
        res.status(400).send({error:error.message});
    }
};
