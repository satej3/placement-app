const router = require('express').Router();
const studentController = require('../Controllers/StudentController');

router.get('/', studentController.student_all);

router.post('/addStudent', studentController.save_student);

router.post('/deleteStudent/:id', studentController.delete_student);

router.get('/downloadReport', studentController.downloadCsv);

module.exports = router;
