import fs from "fs";
import { getFileContentsAsEntries, EntryBook, Entries } from "./utils";

export const TRIP_ROUTE_INDEX: number = 0;
export const TRIP_SHAPE_INDEX: number = 6;
export const tripFileToTripEntries: EntryBook = new Map<string, Entries>();
export let allTripEntries: Entries = [];

const TRIPS_DIRECTORY: string = "./data/trips";

export function initializeTrips(): boolean {
    if (!fs.existsSync(TRIPS_DIRECTORY)) {
        console.error(`${TRIPS_DIRECTORY} not found!`);
        return false;
    }
    const tripFiles: string[] = fs.readdirSync(TRIPS_DIRECTORY);
    if (!tripFiles) {
        console.error("Couldn't read trips directory!");
        return false;
    }
    tripFiles.forEach((tripFileName) => {
        const tripFileContents: string = fs.readFileSync(`${TRIPS_DIRECTORY}/${tripFileName}`).toString();
        const tripEntries: Entries = getFileContentsAsEntries(tripFileContents);
        tripEntries.forEach((tripEntry) => {
            tripEntry[tripEntry.length - 1] = tripEntry[tripEntry.length - 1].replace(/\r/g, "");
        })
        tripFileToTripEntries.set(tripFileName, tripEntries);
        allTripEntries = allTripEntries.concat(tripEntries);
    });
    return true;
}

export function testTrips(routeName: string) {
    console.log(`Testing trips with name ${routeName}`);
    allTripEntries.forEach((tripEntry) => {
        if (tripEntry[TRIP_ROUTE_INDEX] == routeName) {
            console.log(`Found ${routeName} entry ${tripEntry}`);
        }
    });
}