const fs = require("fs");

const TRIPS_DIRECTORY = "./data/trips";

if (!fs.existsSync(TRIPS_DIRECTORY)) {
    console.error(`${TRIPS_DIRECTORY} not found!`);
}
else {
    let tripFiles = fs.readdirSync(TRIPS_DIRECTORY);
    if (!tripFiles) {
        console.error("Couldn't read trips directory!");
    }
    else {
        tripFiles.forEach((fileName) => {
            console.log(`Found trip file ${fileName}`);
            console.log(fs.readFileSync(`${TRIPS_DIRECTORY}/${fileName}`).toString());
        })
    }
}