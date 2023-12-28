
const mongoose = require('mongoose');
const studentSchema = mongoose.Schema(
    {
        batch :         {type : String},
        name :          {type : String},
        mobile :        {type : String},
        email :         {type : String},
        dsaScore :      {type : Number},
        webScore :      {type : Number},
        reactScore :    {type : Number},
        interviews :    [{ 
            companyName : {type: String},
            interviewDate : {type : String},
            _id : {type: mongoose.Schema.Types.ObjectId}
        }],
        jobStatus :     {type : String},        
    },
    {
        timestamps : true
    }
)

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;


