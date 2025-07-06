import fs from "fs";
import { getFileContentsAsEntries } from "./utils";

export const tripFilesToEntries = new Map();

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
    tripFiles.forEach((tripFileName) => {
        console.log(`Found trip file ${tripFileName}`);
        const tripFileContents = fs.readFileSync(`${TRIPS_DIRECTORY}/${tripFileName}`).toString();
        const tripEntries = getFileContentsAsEntries(tripFileContents);
        tripEntries.forEach((tripEntry) => {
            tripEntry[6] = tripEntry[6].replaceAll("\r", "");
        })
        tripFilesToEntries.set(tripFileName, tripEntries);
    });
    return true;
}