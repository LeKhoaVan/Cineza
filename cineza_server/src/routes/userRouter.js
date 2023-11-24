const express = require("express");

const { getAllUserController, getUserByCodeController, createNewUserController, getUserByTypeController,
    updateUserController, sendEmailOTP, verifyEmail, } = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/get-by-code/:codeUser", getUserByCodeController)
userRouter.get("/get-all", getAllUserController)
userRouter.post("/create", createNewUserController);
userRouter.put("/update/:codeUser", updateUserController);
userRouter.get("/get-by-type/:typeUser", getUserByTypeController)
userRouter.post("/send-email-otp", sendEmailOTP);
userRouter.post("/verify-otp", verifyEmail);

module.exports = userRouter;