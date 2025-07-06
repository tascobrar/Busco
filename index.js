import { initializeCoordinates, shapeToCoordinatesMap } from "./coordinates.js";
import { initializeShapes } from "./shapes.js";
import { initializeTrips } from "./trips.js";

function initialize() {
    if (!initializeTrips()) {
        return false;
    }
    if (!initializeShapes()) {
        return false;
    }
    if (!initializeCoordinates()) {
        return false;
    }
    return true;
}

initialize();