import fs from "fs";
import { Entries, EntryBook, getFileContentsAsEntries } from "./utils";

export const SHAPE_SHAPE_INDEX: number = 0;
export const SHAPE_LONGITUDE_INDEX: number = 1;
export const SHAPE_LATITUDE_INDEX: number = 2;
export const shapeFileToShapeEntries: EntryBook = new Map<string, Entries>();
export let allShapeEntries: Entries = [];

const SHAPES_DIRECTORY: string = "./data/shapes";

export function initializeShapes(): boolean {
    if (!fs.existsSync(SHAPES_DIRECTORY)) {
        console.error(`${SHAPES_DIRECTORY} not found!`);
        return false;
    }
    const shapeFiles: string[] = fs.readdirSync(SHAPES_DIRECTORY);
    if (!shapeFiles) {
        console.error("Couldn't read shapes directory!");
        return false;
    }
    shapeFiles.forEach((shapeFileName) => {
        const shapeFileContents: string = fs.readFileSync(`${SHAPES_DIRECTORY}/${shapeFileName}`).toString();
        const shapeEntries: Entries = getFileContentsAsEntries(shapeFileContents);
        shapeEntries.forEach((shapeEntry) => {
            shapeEntry[shapeEntry.length - 1] = shapeEntry[shapeEntry.length - 1].replace(/\r/g, "");
        });
        shapeFileToShapeEntries.set(shapeFileName, shapeEntries);
        allShapeEntries = allShapeEntries.concat(shapeEntries);
    })
    return true;
}

export function testShapes(shapeName: string) {
    console.log(`Testing shapes with name ${shapeName}`);
    allShapeEntries.forEach((shapeEntry) => {
        if (shapeEntry[SHAPE_SHAPE_INDEX] == shapeName) {
            console.log(`Found ${shapeName} entry ${shapeEntry}`);
        }
    });
}