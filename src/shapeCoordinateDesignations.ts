import { allRoutesToShapes } from "./routeShapeDesignations";
import { shapeFileToShapeEntries } from "./shapes";
import { CoordinatePair } from "./utils";

export const shapeFileToShapeToCoordinates: Map<string, Map<string, CoordinatePair[]>> = new Map();
export let allShapesToCoordinates: Map<string, CoordinatePair[]> = new Map();

export function initializeShapeCoordinateDesignations() {
    shapeFileToShapeEntries.forEach((shapeEntries, shapeFile) => {
        const shapeToCoordinates: Map<string, CoordinatePair[]> = new Map();
        shapeFileToShapeToCoordinates.set(shapeFile, shapeToCoordinates);
        shapeEntries.forEach((shapeEntry) => {
            const shape: string = shapeEntry[0];
            const coordinatePair: CoordinatePair = [parseFloat(shapeEntry[1]), parseFloat(shapeEntry[2])];
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

export function testShapeCoordinateDesignations(shapeName: string) {
    console.log(`Testing shape coordinate designations with name ${shapeName}`);
    allShapesToCoordinates.forEach((coordinatePairs, shape) => {
        if (shape == shapeName) {
            coordinatePairs.forEach((coordinatePair) => {
                console.log(`Found coordinate pair ${coordinatePair}`);
            });
        }
    });
}

export function getRouteCoordinates(routeName: string): CoordinatePair[][] {
    let result: CoordinatePair[][] = [];
    let shapes: string[] = Array.from(new Set(allRoutesToShapes.get(routeName)));
    shapes.forEach((shape) => {
        let coordinatePairs: CoordinatePair[] = Array.from(new Set(allShapesToCoordinates.get(shape)));
        result.push(coordinatePairs);
    })
    return result;
}