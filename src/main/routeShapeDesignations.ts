import { TRIP_ROUTE_INDEX, TRIP_SHAPE_INDEX, tripFileToTripEntries } from "./trips";
import { InitializationResult, SUCCESS } from "./initialization";

export const tripFileToRouteToShapesMap: Map<string, Map<string, string[]>> = new Map(); 
export let allRoutesToShapes: Map<string, string[]> = new Map();

export function initializeRouteShapeDesignations(): InitializationResult {
    tripFileToTripEntries.forEach((tripEntries, tripFileName) => {
        let routeToShapesMap: Map<string, string[]>;
        if (tripFileToRouteToShapesMap.has(tripFileName)) {
            routeToShapesMap = tripFileToRouteToShapesMap.get(tripFileName);
        }
        else {
            tripFileToRouteToShapesMap.set(tripFileName, routeToShapesMap = new Map());
        }
        tripEntries.forEach((tripEntry) => {
            let route: string = tripEntry[TRIP_ROUTE_INDEX];
            let shape: string = tripEntry[TRIP_SHAPE_INDEX];
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
    return SUCCESS;
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