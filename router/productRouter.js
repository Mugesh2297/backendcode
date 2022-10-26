const express = require("express");
const router = express.Router();
const productsModule = require("../modules/productsModule");
const auth = require("../modules/authModule");



router.get("/get",productsModule.getProducts)

router.get("/get/:id",productsModule.getProductsByid)


router.put("/update/:id", auth.authorizeUser,productsModule.updateProducts);


router.post("/create",auth.authorizeUser,productsModule.createProducts);


router.delete("/delete/:id",auth.authorizeUser,productsModule.deleteProducts);


module.exports = router;