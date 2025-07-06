import { initializeShapes } from "./shapes.js";
import { initializeTrips } from "./trips.js";

function initialize() {
    if (!initializeTrips()) {
        return false;
    }
    if (!initializeShapes()) {
        return false;
    }
    return true;
}

initialize();