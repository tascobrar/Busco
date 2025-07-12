import { tripFileToTripEntries } from "./trips";

export const tripFileToRouteToShapesMap: Map<string, Map<string, string[]>> = new Map(); 
export let allRoutesToShapes: Map<string, string[]> = new Map();

export function initializeRouteShapeDesignations() {
    tripFileToTripEntries.forEach((tripEntries, tripFileName) => {
        let routeToShapesMap: Map<string, string[]>;
        if (tripFileToRouteToShapesMap.has(tripFileName)) {
            routeToShapesMap = tripFileToRouteToShapesMap.get(tripFileName);
        }
        else {
            tripFileToRouteToShapesMap.set(tripFileName, routeToShapesMap = new Map());
        }
        tripEntries.forEach((tripEntry) => {
            let route: string = tripEntry[0];
            let shape: string = tripEntry[6];
            let shapes: string[];
            if (routeToShapesMap.has(route)) {
                shapes = routeToShapesMap.get(route);
            }
            else {
                routeToShapesMap.set(route, shapes = []);
            }
            shapes.push(shape);
        });
        allRoutesToShapes = new Map([...allRoutesToShapes].concat([...routeToShapesMap]));
    })
    return true;
}

export function testRouteShapeDesignations(routeName: string) {
    console.log(`Testing route shape designations with name ${routeName}`);
    allRoutesToShapes.forEach((shapes, route) => {
        if (route == routeName) {
            shapes.forEach((shape) => {
                console.log(`Found ${routeName} shape ${shape}`);
            });
        }
    });
}