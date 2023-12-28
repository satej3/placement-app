// Requiring modules
const express = require('express');
const db = require('./Config/mongoose');
const Student = require('./Models/StudentModel');
const interview = require('./Models/InterviewModel');
const userModel = require('./Models/User');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const studentController = require('./Controllers/StudentController');
// Import Routes
const studentRoutes = require('./Routes/StudentRouter');
const interviewRoutes = require('./Routes/InterviewRouter');

// Creating express object
const app = express();

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT,console.log(`Server started on port ${PORT}`));

//set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views') );

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use sessions for tracking logins
app.use(session({
    secret: 'saty',
    resave: false,
    saveUninitialized: true,
}));

// Route Middleware - this is for backend api call..
app.use('/api/Student', studentRoutes);
app.use('/api/Interview', interviewRoutes); 

// Handling GET request - this is for browser rendering on load.
// For Login Request
app.get('/', (req,res) => { res.redirect('/login')});
app.get('/login', (req, res) => {res.render('login', { message: '' });});
// For Signup Reuest
app.get('/signup', (req, res) => {res.render('signup', { message: '' })});
// For Student Requests
app.get('/api/student', (req, res) => {res.render('studentlist')});
app.get('/api/addstudent', (req, res) => {res.render('addstudent')});   
// For Interview Requests
app.get('/api/interview', (req, res) => {res.render('interviewlist')});
app.get('/api/addinterview', studentController.get_all_students);


app.post('/login', async (req, res) => {
    const { userName, password } = req.body;
	console.log(userName , password);

    // Find the user by username in the database
    const user = await userModel.find( { userName : userName });

	console.log("===========================================================");
	console.log("user found = ", user);
	console.log("===========================================================");

    if (!user) {
		console.log('user not found..');
        // User not found, render login page with an error message
        return res.render('login', { message: 'Invalid username or password' });
    } else {
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user[0].password);
		// // const passwordMatch = ;
		// console.log(user[0].password);
		console.log("passwordMatch =", passwordMatch);

        if (passwordMatch) {
			req.session.userName = userName;
			req.session.password = password;
            // Passwords match, user is authenticated
            console.log(req.session.userName);
            console.log(req.session.password);
            return res.redirect('/api/student'); // Redirect to the student list page
        } else {
			console.log('password didnt matched..')
            // Passwords do not match, render login page with an error message
            return res.render('login', { message: 'Invalid username or password' });
        }
    }
});

app.get('/logout', (req, res) => {
    // Clear the session variable on logout
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});

app.post('/signup', async (req, res) => {
	if(req.body.password === req.body.confirmPassword){
        const {userName, password} = req.body;
        const saltRounds = 5;
        let newPassword = await bcrypt.hash(password, saltRounds);
        // console.log("new password = ", newPassword);
		try {
 			const user = await userModel.create({userName, password: newPassword});
			console.log("Created User = ", user);
			res.redirect('/login');
		} catch (error) {
			console.error("Error Occured : ", error);
			res.status(500).json({message : error.message});
		}
	}
	else{
		return res.render('signup', { message : "Password Didn't Matched. Please try again "});
	}
})




  
    



