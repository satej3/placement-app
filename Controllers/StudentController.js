const studentModel = require('../Models/StudentModel');
const fs = require('fs');
const fastcsv = require('fast-csv');

// Get All Students
const student_all = async (req, res) => {
	if(req.session.userName){
		try {
			const list = await studentModel.find({});
			res.render('studentlist', {list} );
		} catch (error) {
			console.error("Error Occured : ", error.message);
			res.status(500).json({message : error.message});
		}
		// res.render('studentlist')
	}
	else{
		res.redirect('/login');
	}
    
}

//return all students 
const get_all_students = async (req, res) => {
	try {
		const list = await studentModel.find({});
		// return list;
		return res.render('addinterview', {list} );
	} catch (error) {
		console.error("Error Occured : ", error.message);
		res.status(500).json({message : error.message});
	}
}

// Save New Student
const save_student = async (req, res) => {
	if(req.session.userName){
		const { name, email, batch, mobile, dsaScore, webScore, reactScore, jobStatus, } = req.body;
		const newStudent = {
							name,
							email,
							batch,
							mobile,
							dsaScore,
							webScore,
							reactScore,
							jobStatus
						};
		try {
			// const student = await studentModel.create(req.body);
			const student = await studentModel.create(newStudent);
			console.log("Saved data = ", student);
			// res.status(200).json(student);
			res.redirect('/api/student');
		} catch (error) {
			console.error("Error Occured : ", error.message);
			res.status(500).json({message : error.message});
		}
	}
	else{
		res.redirect('/login');
	}
}

// Delete Student
const delete_student = async (req, res) => {
    const studentId = req.params.id;
	// console.log("we got id to delete = ", studentId);
	if(req.session.userName){
		try {
			// Use mongoose to delete the record with the specified ID
			const deletedStudent = await studentModel.deleteOne({ _id: studentId });
			console.log(deletedStudent)
			// Redirect to the page displaying the remaining records
			res.redirect('/api/student');
		} catch (error) {
			console.error("Error Occurred: ", error.message);
			res.status(500).json({ message: error.message });
		}
	}
	else{
		res.redirect('/login');
	}
}

const downloadCsv = async function (req, res) {
	try {
		const students = await studentModel.find({});

		let data = '';
		let no = 1;
		let csv = 'S.No, Name, Email, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result';

		for (let student of students) {
			data =
				no +
				',' +
				student.name +
				',' +
				student.email +
				',' +
				student.mobile +
				',' +
				student.batch +
				',' +
				student.dsaScore +
				',' +
				student.webScore +
				',' +
				student.reactScore;

			if (student.interviews.length > 0) {
				for (let interview of student.interviews) {
					data += ',' + interview.companyName + ',' + interview.interviewDate.toString() + ',' + student.jobStatus;
				}
			}
			no++;
			csv += '\n' + data;
		}

		console.log("Data exported = ", csv);
		const dataFile = fs.writeFile('report/data.csv', csv, function (error, data) {
			if (error) {
				console.log(error);
				return res.redirect('back');
			}
			console.log('Report generated successfully');
			return res.download('report/data.csv');
		});
	} catch (error) {
		console.log(`Error in downloading file: ${error}`);
		return res.redirect('back');
	}
};



module.exports = {
    student_all,
	get_all_students,
    save_student,
    delete_student,
	downloadCsv
}
