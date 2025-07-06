import fs from "fs";

export const shapeToCoordinatesMap = new Map();

const SHAPES_DIRECTORY = "./data/shapes";

export function initializeCoordinates() {
    if (!fs.existsSync(SHAPES_DIRECTORY)) {
        console.error(`${SHAPES_DIRECTORY} not found!`);
        return false;
    }
    const shapeFiles = fs.readdirSync(SHAPES_DIRECTORY);
    if (!shapeFiles) {
        console.error("Couldn't read shapes directory!");
    }
    shapeFiles.forEach((fileName) => {
        console.log(`Found shape file ${fileName}`);
        const shapeFileContents = fs.readFileSync(`${SHAPES_DIRECTORY}/${fileName}`).toString();
        const shapeEntries = shapeFileContents
        .split("\n")
        .slice(1)
        .filter((string) => !!string)
        .map((string) => string.split(","));
        shapeEntries.forEach((entry) => {
            entry[3] = entry[3].replaceAll("\r", "");
        });
        shapeEntries.forEach((entry) => {
            let shape = entry[0];
            let coordinates = [parseFloat(entry[1]), parseFloat(entry[2])];
            if (!shapeToCoordinatesMap.has(shape)) {
                shapeToCoordinatesMap.set(shape, []);
            }
            shapeToCoordinatesMap.get(shape).push(coordinates);
        })
    })
    return true;
}