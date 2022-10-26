const express = require("express");
const router = express.Router();
const leadsModule = require("../modules/leadsModule");
const auth = require("../modules/authModule");



router.get("/get",leadsModule.getLeads)


router.get("/get/:id",leadsModule.getLeadsById)

router.put("/update/:id", auth.authorizeUser,leadsModule.updateLeads);


router.post("/create",auth.authorizeUser,leadsModule.createLeads);


router.delete("/delete/:id",auth.authorizeUser,leadsModule.deleteLeads);


module.exports = router;