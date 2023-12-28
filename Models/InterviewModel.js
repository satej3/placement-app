
const mongoose = require('mongoose');
const interviewSchema = mongoose.Schema(
    {
        companyName :          {type : String},
        interviewDate :        {type : String},
        result: 			   {type: String},
    },
    {
        timestamps : true
    }
)

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;


