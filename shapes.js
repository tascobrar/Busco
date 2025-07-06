import fs from "fs";

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
    }
    shapeFiles.forEach((shapeFileName) => {
        console.log(`Found shape file ${shapeFileName}`);
        const shapeFileContents = fs.readFileSync(`${SHAPES_DIRECTORY}/${shapeFileName}`).toString();
        const shapeEntries = shapeFileContents
        .split("\n")
        .slice(1)
        .filter((string) => !!string)
        .map((string) => string.split(","));
        shapeEntries.forEach((shapeEntry) => {
            shapeEntry[3] = shapeEntry[3].replaceAll("\r", "");
        });
        shapeFilesToEntries.set(shapeFileName, shapeEntries);
    })
    return true;
}