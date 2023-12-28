const router = require('express').Router();
const interviewController = require('../Controllers/InterviewController');

//to fetch all interviews
router.get('/', interviewController.interviews_all);

//to save interview
router.post('/addInterview', interviewController.save_interview);

//to update interview
router.post('/updateInterview/:id', interviewController.update_interview);

//to delete interview
router.post('/deleteInterview/:id', interviewController.delete_interview);

module.exports = router;
