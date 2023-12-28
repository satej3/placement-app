const router = require('express').Router();
const companyController = require('../Controllers/CompanyController');

//to fetch all interviews
router.get('/', companyController.companies_all);

//to save interview
router.post('/addCompany', companyController.save_company);

//to update interview
router.put('/updateCompany/:id', companyController.update_company);

//to delete interview
router.post('/deleteCompany/:id', companyController.delete_company);

module.exports = router;
