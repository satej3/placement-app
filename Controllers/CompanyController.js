const companyModel = require('../Models/CompanyModel');

// Get All companies
const companies_all = async (req, res) => {
    if(req.session.userName){
        try {
            const list = await companyModel.find({});
            console.log("all companies = ", list);
            res.render('companylist', {list} );
        } catch (error) {
            console.error("Error Occured : ", error.message);
            res.status(500).json({message : error.message});
        }
    }
    else{
        res.redirect('/login');
    }
}

// Save New company
const save_company = async (req, res) => {
    if(req.session.userName){
        try {
            const company = await companyModel.create(req.body);
            console.log("Saved company = ", company);
            res.redirect('/api/company');
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
const update_company = async (req, res) => {
	const companyId = req.params.id;
	console.log("we got id to update = ", companyId);
    if(req.session.userName){
        try {
            // Use mongoose to delete the record with the specified ID
            const updatedCompany = await companyModel.updateOne({ _id: companyId });
            console.log(updatedCompany)
            // Redirect to the page displaying the remaining records
            res.redirect('/api/company');
        } catch (error) {
            console.error("Error Occurred: ", error.message);
            res.status(500).json({ message: error.message });
        }
    }
	else{
		res.redirect('/login');
	}
}

// Delete Interview
const delete_company = async (req, res) => {
    const companyId = req.params.id;
	console.log("we got interview id to delete = ", companyId);
    if(req.session.userName){
        try {
            // Use mongoose to delete the record with the specified ID
            const deletedCompany = await companyModel.deleteOne({ _id: companyId });
            console.log(deletedCompany)
            // Redirect to the page displaying the remaining records
            res.redirect('/api/company');
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
    companies_all,
    save_company,
	update_company,
    delete_company
}
