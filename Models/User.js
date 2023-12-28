
const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        userName :  {type : String},
        password :  {type : String},
        
    },
    {
        timestamps : true
    }
)

const User = mongoose.model('User',userSchema);
module.exports = User;


