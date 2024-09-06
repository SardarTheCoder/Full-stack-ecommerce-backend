const express = require("express")
const router= express.Router();
const userController = require("../controller/user.controller");

router.get("/profile",userController.getUserProfile);
router.get("/",userController.getAllUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports=router;