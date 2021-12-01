// Include packages needed for this application
const fs = require("fs");
const path = require("path");

const writeToFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            path.join("./", "dist", "index.html"),
            fileContent,
            (err) => {
                // if there's an error, reject the Promise and send the error to the Promise's '.catch()' method
                if (err) {
                    reject(err);
                    // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                    return;
                }

                // if everything went well, resolve the Promise and send the successful data to the '.then()' method
                resolve({
                    ok: true,
                    message: "File created!"
                });
            }
        );
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile(
            path.join("./", "src", "style.css"),
            path.join("./", "dist", "style.css"),
            err => {
                // if there's an error, reject the Promise and send the error to the Promise's '.catch()' method
                if (err) {
                    reject(err);
                    // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                    return;
                }

                // if everything went well, resolve the Promise and send the successful data to the '.then()' method
                resolve({
                    ok: true,
                    message: "Stylesheet created!"
                });
            }
        );
    });
};

module.exports = { writeToFile, copyFile };