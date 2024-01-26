const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI_REMOTE,{
    useNewUrlParser:true
}).then(()=>{
    console.log("db connected successfully");
}).catch((e)=>{
    console.log(e);
})