const express = require("express");
const router = express.Router();
const userModule = require("../modules/userModule");
const auth = require("../modules/authModule");



router.get("/get",userModule.getUser)


router.get("/get/:id",userModule.getUserById)

router.put("/update/:id", auth.authorizeUser,userModule.updateUser);


router.post("/create",auth.authorizeUser,userModule.createUser);


router.delete("/delete/:id",auth.authorizeUser,userModule.deleteUser);


module.exports = router;