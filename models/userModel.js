const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type:String,
    required:true
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
});



// userSchema.methods.generateAuthToken = async function(){
//     const token = jwt.sign({_id:this._id.toString()},"thisismyrestroproject")
//     this.tokens = this.tokens.concat({token})
//     console.log(this);
//     await this.save();

//     return token
// }




const User = mongoose.model('User', userSchema);


module.exports = User;
