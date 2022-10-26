const express = require("express");
const router = express.Router();
const employeeModule = require("../modules/employeeModule");
const auth = require("../modules/authModule");



router.get("/get",employeeModule.getEmployees)


router.put("/update/:id", auth.authorizeUser,employeeModule.updateEmployee);


router.post("/create",auth.authorizeUser,employeeModule.createEmployee);


router.delete("/delete/:id",auth.authorizeUser,employeeModule.deleteEmployee);


module.exports = router;