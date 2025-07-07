import { tripFileToRouteToShapesMap } from "./routeShapeDesignations.js";
import { shapeFileToShapeToCoordinates } from "./shapeCoordinateDesignations.js";
import { flattenDesignations } from "./utils.js";

export function getAllQ53Coordinates() {
    const result = [];
    const allRouteShapeDesignations = flattenDesignations(tripFileToRouteToShapesMap);
    const allQ53Shapes = allRouteShapeDesignations.get("Q53+");
    new Set(allQ53Shapes).forEach(q53Shape => {
        flattenDesignations(shapeFileToShapeToCoordinates).get(q53Shape).forEach((coordinatePair) => {
            result.push(coordinatePair);
        })
    });
    return result;
}