const express = require("express");
const userApp = express.Router(); // mounting a rounter to handle the http request accordingly 
const userController = require("./userControllers"); //The application logic to handle the http request stored in userController.js file following the MVC model

userApp
    .route("/api/users")
    .get(userController.getAllUsers)
    .post(userController.postUsers);
userApp
    .route("/api/users/:id")
    .get(userController.getSpecificUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);
module.exports = userApp;
