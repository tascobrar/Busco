import fs from "fs";
import { getFileContentsAsEntries } from "./utils.js";

export const shapeFilesToEntries = new Map();

const SHAPES_DIRECTORY = "./data/shapes";

export function initializeShapes() {
    if (!fs.existsSync(SHAPES_DIRECTORY)) {
        console.error(`${SHAPES_DIRECTORY} not found!`);
        return false;
    }
    const shapeFiles = fs.readdirSync(SHAPES_DIRECTORY);
    if (!shapeFiles) {
        console.error("Couldn't read shapes directory!");
        return false;
    }
    shapeFiles.forEach((shapeFileName) => {
        console.log(`Found shape file ${shapeFileName}`);
        const shapeFileContents = fs.readFileSync(`${SHAPES_DIRECTORY}/${shapeFileName}`).toString();
        const shapeEntries = getFileContentsAsEntries(shapeFileContents);
        shapeEntries.forEach((shapeEntry) => {
            shapeEntry[3] = shapeEntry[3].replaceAll("\r", "");
        });
        shapeFilesToEntries.set(shapeFileName, shapeEntries);
    })
    return true;
}

export function testShapes() {
    console.log("Testing shapes");
    shapeFilesToEntries.forEach((shapeEntries, fileName) => {
        shapeEntries.forEach((shapeEntry) => {
            if (shapeEntry[0] == "SBS530049") {
                console.log(`Found SBS530049 coordinates ${[shapeEntry[1]]},${shapeEntry[2]}`);
            }
        });
    });
}