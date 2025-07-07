import { allRoutesToShapes } from "./routeShapeDesignations.js";
import { shapeFileToShapeEntries } from "./shapes.js";

export const shapeFileToShapeToCoordinates = new Map();
export let allShapesToCoordinates = [];

export function initializeShapeCoordinateDesignations() {
    shapeFileToShapeEntries.forEach((shapeEntries, shapeFile) => {
        const shapeToCoordinates = new Map();
        shapeFileToShapeToCoordinates.set(shapeFile, shapeToCoordinates);
        shapeEntries.forEach((shapeEntry) => {
            const shape = shapeEntry[0];
            const coordinatePair = [parseFloat(shapeEntry[1]), parseFloat(shapeEntry[2])];
            if (shapeToCoordinates.has(shape)) {
                shapeFileToShapeToCoordinates.get(shapeFile).get(shape).push(coordinatePair);
            }
            else {
                shapeFileToShapeToCoordinates.get(shapeFile).set(shape, [coordinatePair]);
            }
        });
        allShapesToCoordinates = new Map([...allShapesToCoordinates].concat([...shapeToCoordinates]));
    });
    return true;
}

export function testShapeCoordinateDesignations(shapeName) {
    console.log(`Testing shape coordinate designations with name ${shapeName}`);
    allShapesToCoordinates.forEach((coordinatePairs, shape) => {
        if (shape == shapeName) {
            coordinatePairs.forEach((coordinatePair) => {
                console.log(`Found coordinate pair ${coordinatePair}`);
            });
        }
    });
}

export function getRouteCoordinates(routeName) {
    let result = [];
    let shapes = Array.from(new Set(allRoutesToShapes.get(routeName)));
    shapes.forEach((shape) => {
        let coordinatePairs = Array.from(new Set(allShapesToCoordinates.get(shape)));
        result.push(coordinatePairs);
    })
    return result;
}