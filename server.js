/*This is starting file of the nodejs application */
const app = require("./app"); // 
const port = 3000;

/*Starting server at port 3000 using the listen function*/
app.listen(port, () => {
    console.log("The server is started and listens at port 3000");
});