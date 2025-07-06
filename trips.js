import fs from "fs";

export const triptionary = new Map();

const TRIPS_DIRECTORY = "./data/trips";

export function initializeTrips() {
    if (!fs.existsSync(TRIPS_DIRECTORY)) {
        console.error(`${TRIPS_DIRECTORY} not found!`);
        return false;
    }
    const tripFiles = fs.readdirSync(TRIPS_DIRECTORY);
    if (!tripFiles) {
        console.error("Couldn't read trips directory!");
        return false;
    }
    tripFiles.forEach((fileName) => {
        console.log(`Found trip file ${fileName}`);
        const tripFileContents = fs.readFileSync(`${TRIPS_DIRECTORY}/${fileName}`).toString();
        const tripEntries = tripFileContents
        .split("\n")
        .slice(1)
        .filter((string) => !!string)
        .map(entry => entry.split(","))
        tripEntries.forEach((entry) => {
            entry[6] = entry[6].replaceAll("\r", "");
        })
        triptionary.set(fileName, tripEntries);
    });
    return true;
}