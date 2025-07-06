import { triptionary } from "./trips.js";

export const routeToShapeMap = new Map();

export function initializeShapes() {
    triptionary.forEach((tripEntries, tripFileName) => {
        tripEntries.forEach((tripEntry) => {
            let route = tripEntry[0];
            let shape = tripEntry[6];
            if (!routeToShapeMap.has(route)) {
                routeToShapeMap.set(route, []);
            }
            routeToShapeMap.get(route).push(shape);
        });
    });
    return true;
}