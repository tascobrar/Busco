import { tripFilesToEntries } from "./trips.js";

export const tripFilesToRouteToShapesMaps = new Map(); 

export function initializeRouteShapeDesignations() {
    tripFilesToEntries.forEach((tripEntries, tripFileName) => {
        let routeToShapesMap;
        if (tripFilesToRouteToShapesMaps.has(tripFileName)) {
            routeToShapesMap = tripFilesToRouteToShapesMaps.get(tripFileName);
        }
        else {
            tripFilesToRouteToShapesMaps.set(tripFileName, routeToShapesMap = new Map());
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
    tripFilesToRouteToShapesMaps.forEach((routeToShapesMap, tripFileName) => {
        routeToShapesMap.forEach((shapes, route) => {
            if (route == routeName) {
                shapes.forEach((shape) => {
                    console.log(`Found ${routeName} shape ${shape}`);
                })
            }
        })
    });
}