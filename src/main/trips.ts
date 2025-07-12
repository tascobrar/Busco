import * as fs from "fs";
import { getFileContentsAsEntries, EntryBook, Entries } from "./utils";
import { failedInitialization, InitializationResult, SUCCESS } from "./initialization";

export const TRIP_ROUTE_INDEX: number = 0;
export const TRIP_SHAPE_INDEX: number = 6;
export const tripFileToTripEntries: EntryBook = new Map<string, Entries>();
export let allTripEntries: Entries = [];

const TRIPS_DIRECTORY: string = "./data/trips";

export function initializeTrips(): InitializationResult {
    if (!fs.existsSync(TRIPS_DIRECTORY)) {
        return failedInitialization(`${TRIPS_DIRECTORY} not found!`);
    }
    const tripFiles: string[] = fs.readdirSync(TRIPS_DIRECTORY);
    if (!tripFiles) {
        return failedInitialization("Couldn't read trips directory!");
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
    return SUCCESS;
}

export function testTrips(routeName: string) {
    console.log(`Testing trips with name ${routeName}`);
    allTripEntries.forEach((tripEntry) => {
        if (tripEntry[TRIP_ROUTE_INDEX] == routeName) {
            console.log(`Found ${routeName} entry ${tripEntry}`);
        }
    });
}