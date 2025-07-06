import { initializeRouteShapeDesignations, testRouteShapeDesignations } from "./routeShapeDesignations.js";
import { initializeShapes, testShapes } from "./shapes.js";
import { initializeTrips, testTrips } from "./trips.js";

function initialize() {
    if (!initializeTrips()) {
        return false;
    }
    if (!initializeShapes()) {
        return false;
    }
    if (!initializeRouteShapeDesignations()) {
        return false;
    }
    return true;
}

initialize();
testTrips();
testShapes();
testRouteShapeDesignations();