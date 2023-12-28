
const mongoose = require('mongoose');
const companySchema = mongoose.Schema(
    {
        studentId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
          }],
          interviewId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview'
          }],
        
    },
    {
        timestamps : true
    }
)

const Company = mongoose.model('Company', companySchema);
module.exports = Company;


