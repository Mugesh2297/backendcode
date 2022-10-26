const express = require("express");
const router = express.Router();
const servicesModule = require("../modules/servicesModule");
const auth = require("../modules/authModule");



router.get("/get",servicesModule.getServices)


router.get("/get/:id",servicesModule.getServiceByID)

router.put("/update/:id", auth.authorizeUser,servicesModule.updateServices);


router.post("/create",auth.authorizeUser,servicesModule.createServices);


router.delete("/delete/:id",auth.authorizeUser,servicesModule.deleteServices);


module.exports = router;