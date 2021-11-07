const fs = require("fs"); // requiring the module to manipulate with file system 
const userJSON = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, { encoding: "utf-8" })); // reading the json which is sample data created by me which consist of user info
const findObject = (getId) => {
    for (let i = 0; i < userJSON.length ; i++) {
        if (userJSON[i] != null && userJSON[i].id === getId) {
            return userJSON[i];
        }
    }
    return undefined
}

/*The url is get all the users names thus we applied a get request method send the entire json file with respective status*/ 
exports.getAllUsers = (requestUsers, responseUsers) => {
    responseUsers.status(200).json({
        status: "OK",
        data: {
            userJSON
        }
    });
}
/*This url the client sends the data as json object and we write into the json file a post request*/
exports.postUsers = (requestUsers, responUsers) => {
    const newObject = requestUsers.body;
    userJSON.push(newObject);
    fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(userJSON), (err) => {
        responUsers.status(201).json({
            status: "Written successfully",
            data: {
                newObject
            }
        });
    })
}

/*This url an id is mentioned additionally which should inturn fetch the particular user with the respective id */ 
exports.getSpecificUser = (requestUser, responseUser) => {
    const getId = Number(requestUser.params.id);
    const getData = findObject(getId);
    console.log(getData)
    if (!getData) {
        responseUser.status(404).json({
            status: "Invalid Id",
            message: "Data not found"
        })
    }
    else {
        responseUser.status(200).json({
            status: "OK",
            data: {
                getData
            }
        });
    }
    
}

/*A patch request is update a key for particular json object in the json file with respective to user ID*/
exports.updateUser = (requestUsers, responseUsers) => {
    const getId = Number(requestUsers.params.id);
    const getObject = findObject(getId);
    if (!getObject) {
        responseUsers.status(404).json({
            status: "Not found",
            message : "Invalid data"
        });
    }
    else {
        const getId = Number(requestUsers.params.id);
        const getCollege = requestUsers.body.college
        console.log(getCollege);
        userJSON[getId].college = getCollege;
        fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(userJSON), (err) => {
            responseUsers.status(201).json({
                status: "Updated successfully",
                data: {
                    getObject
                }
            });
        })
    }
}

/*A delete request is used to delete a json object with according to the user Id specified in the url params*/
exports.deleteUser = (requestUser, responseUser) => {
    const getId = Number(requestUser.params.id);
    const getObject = findObject(getId);
    console.log(getObject)
    if (!getObject) {
        responseUser.status(404).json({
            status: "Not found",
            message : "Invalid data"
        });
    }
    else {
        const getObject = userJSON.find(data => {
            if(data != null)
                data.id === getId
        })
        delete userJSON[getId];
        fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(userJSON), (err) => {
            responseUser.status(204).json({
                status: "Deleted successfully",
                data: {
                    getObject
                }
            });
        })
    }
}