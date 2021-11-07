const fs = require("fs"); // require the fs module to manipulate with file system 
const express = require("express"); // requiring the express module 
const app = express();
const morgan = require("morgan")
app.use(morgan("dev")); // using a morgan middleware to get the requested url at the client side to print at the console
app.use(express.json()); // using express.json() middleware to further read the body the code to handle post ,patch,put requests
const userRouters = require("./userRoutes"); // Importing the packages rounters that routes the data acoording to the http methods
app.use("/", userRouters); // whenver the home page is requested the control flow goes to the userRoute.js which routes according to the url
module.exports = app; // exporting to be used by the server.js file which is the starting file
