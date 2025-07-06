const fs = require("fs");

const TRIPS_DIRECTORY = "./data/trips";

if (!fs.existsSync(TRIPS_DIRECTORY)) {
    console.error(`${TRIPS_DIRECTORY} not found!`);
}
else {
    fs.readdir("./data/trips", (error, files) => {
        if (error) {
            console.error("Couldn't read trips directory!", error);
            return;
        }
        files.forEach((file) => {
            console.log(`Found trip file ${file}`)
        })
    });
}