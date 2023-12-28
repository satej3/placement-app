const interviewModel = require('../Models/InterviewModel');
const studentModel = require('../Models/StudentModel');

// Get All interviews
const interviews_all = async (req, res) => {
    if(req.session.userName){
        try {
            // const list = await interviewModel.find({});
            const list = await studentModel.find({});
            console.log("all interviews = ", list);
            res.render('interviewlist', {list} );
        } catch (error) {
            console.error("Error Occured : ", error.message);
            res.status(500).json({message : error.message});
        }
    }
    else{
        res.redirect('/login');
    }
}

// Save New interview
const save_interview = async (req, res) => {
  console.log("request data = ", req.body);
    if(req.session.userName){
            try {
              const {companyName, interviewDate} = req.body;
              const student = await studentModel.findOne({ _id : req.body.id});
              student.interviews.push({companyName, interviewDate});
              const updatedStudent = await studentModel.create(student);
              const existingCompany = await interviewModel.findOne({companyName: companyName});
              if(!existingCompany){
                const interview = await interviewModel.create({companyName, interviewDate, result : 'Pending'});
                console.log("Saved interview = ", interview);
              }
              console.log("updated student = ", updatedStudent);
              res.redirect('/api/interview');
            } catch (error) {
                console.error("Error Occured : ", error.message);
                res.status(500).json({message : error.message});
            }
    }
    else{
        res.redirect('/login');
    }
}

// update interview to mark as done
const update_interview = async (req, res) => {
	const studentID = req.params.id;
  const interviewId = req.query.interviewId;
	console.log("we got id to update = ", studentID);
	console.log("we got id to update = ", interviewId);
	console.log("we got id to update = ", req.body);
  
    if(req.session.userName){
        try {
            // Use mongoose to delete the record with the specified ID
            const foundInterview = await interviewModel.updateOne({ _id: interviewId }, { $set: req.body });
            console.log("foundInterview = ", foundInterview);
            const student = await studentModel.findOne({_id : studentID});
            student.jobStatus = req.body.result;
            const updatedStudent = await student.save();
            console.log("found updated student = ", updatedStudent);
            // Redirect to the page displaying the remaining records
            res.redirect('/api/interview');
        } catch (error) {
            console.error("Error Occurred: ", error);
            res.status(500).json({ message: error.message });
        }
    }
	else{
		res.redirect('/login');
	}
}

/////////////////////////////////////////////////////////////////////////////////

// const update_interview = async (req, res) => {
// 	// const intrviewId = req.params.id;
// 	// console.log("we got id to update = ", intrviewId);
//     if(req.session.userName){
//         const { id } = req.params;
//         const { companyName, companyResult } = req.body;
//         try {
//           const student = await Student.findById(id);
//           if (student && student.interviews.length > 0) {
//             for (let company of student.interviews) {
//               if (company.company === companyName) {
//                 company.result = companyResult;
//                 student.save();
//                 break;
//               }
//             }
//           }
//           const company = await Company.findOne({ name: companyName });
      
//           if (company) {
//             for (let std of company.students) {
//               /// compare student id and id passed in params
//               if (std.student.toString() === id) {
//                 std.result = companyResult;
//                 company.save();
//               }
//             }
//           }
//           console.log('Interview Status Changed Successfully');
//           return res.redirect('back');
//         } catch (error) {
//           console.log(`Error in updating status: ${error}`);
//           res.redirect('back');
//         }
//     }
// 	else{
// 		res.redirect('/login');
// 	}
// }


//////////////////////////////////////////////////////////////////////////////////

// Delete Interview
const delete_interview = async (req, res) => {
    const studentId = req.params.id;
	console.log("we got interview id to delete = ", studentId);
    if(req.session.userName){
        try {
            // Use mongoose to delete the record with the specified ID
            const deletedStudent = await interviewModel.deleteOne({ _id: studentId });
            console.log(deletedStudent)
            // Redirect to the page displaying the remaining records
            res.redirect('/api/interview');
        } catch (error) {
            console.error("Error Occurred: ", error.message);
            res.status(500).json({ message: error.message });
        }
    }
    else{
        res.redirect('/login');
    }
}

module.exports = {
    interviews_all,
    save_interview,
	update_interview,
    delete_interview
}
