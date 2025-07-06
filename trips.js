import fs from "fs";

const TRIPS_DIRECTORY = "./data/trips";

export const triptionary = new Map();

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
        .slice(0, -1)
        .map(entry => entry.split(","))
        .map((tripFileEntry) => {
            tripFileEntry[6] = tripFileEntry[6].replaceAll("\r", ""); 
            return tripFileEntry;
        });
        triptionary.set(fileName, tripEntries);
    });
    return true;
}