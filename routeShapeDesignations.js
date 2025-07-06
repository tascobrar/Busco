import { tripFileToTripEntries } from "./trips.js";

export const tripFileToRouteToShapesMap = new Map(); 

export function initializeRouteShapeDesignations() {
    tripFileToTripEntries.forEach((tripEntries, tripFileName) => {
        let routeToShapesMap;
        if (tripFileToRouteToShapesMap.has(tripFileName)) {
            routeToShapesMap = tripFileToRouteToShapesMap.get(tripFileName);
        }
        else {
            tripFileToRouteToShapesMap.set(tripFileName, routeToShapesMap = new Map());
        }
        tripEntries.forEach((tripEntry) => {
            let route = tripEntry[0];
            let shape = tripEntry[6];
            let shapes;
            if (routeToShapesMap.has(route)) {
                shapes = routeToShapesMap.get(route);
            }
            else {
                routeToShapesMap.set(route, shapes = []);
            }
            shapes.push(shape);
        })
    })
}

export function testRouteShapeDesignations(routeName) {
    console.log(`Testing route shape designations with name ${routeName}`);
    tripFileToRouteToShapesMap.forEach((routeToShapesMap, tripFileName) => {
        routeToShapesMap.forEach((shapes, route) => {
            if (route == routeName) {
                shapes.forEach((shape) => {
                    console.log(`Found ${routeName} shape ${shape}`);
                })
            }
        })
    });
}