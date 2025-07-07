import fs from "fs";
import { getFileContentsAsEntries } from "./utils.js";

export const tripFileToTripEntries = new Map();
export let allTripEntries = [];

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
        const tripFileContents = fs.readFileSync(`${TRIPS_DIRECTORY}/${tripFileName}`).toString();
        const tripEntries = getFileContentsAsEntries(tripFileContents);
        tripEntries.forEach((tripEntry) => {
            tripEntry[6] = tripEntry[6].replaceAll("\r", "");
        })
        tripFileToTripEntries.set(tripFileName, tripEntries);
        allTripEntries = allTripEntries.concat(tripEntries);
    });
    return true;
}

export function testTrips(routeName) {
    console.log(`Testing trips with name ${routeName}`);
    allTripEntries.forEach((tripEntry) => {
        if (tripEntry[0] == routeName) {
            console.log(`Found ${routeName} entry ${tripEntry}`);
        }
    });
}