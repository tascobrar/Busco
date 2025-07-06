import { triptionary } from "./trips.js";

export const routeToShapeMap = new Map();

export function initializeShapes() {
    triptionary.forEach((entries, name) => {
        entries.forEach((entry) => {
            let route = entry[0];
            let shape = entry[6];
            if (!routeToShapeMap.has(route)) {
                routeToShapeMap.set(route, []);
            }
            routeToShapeMap.get(route).push(shape);
        });
    });
    return true;
}