import { getAllQ53Coordinates } from "./q53.js";
import { initializeRouteShapeDesignations, testRouteShapeDesignations } from "./routeShapeDesignations.js";
import { initializeShapeCoordinateDesignations, testShapeCoordinateDesignations } from "./shapeCoordinateDesignations.js";
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
    if (!initializeShapeCoordinateDesignations()) {
        return false;
    }
    return true;
}

initialize();
testTrips("Q53+");
testShapes("SBS440520");
//testRouteShapeDesignations("Q35");
//testShapeCoordinateDesignations("SBS440520");
console.log(getAllQ53Coordinates());