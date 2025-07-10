import { initializeRouteShapeDesignations, testRouteShapeDesignations } from "./routeShapeDesignations.js";
import { getRouteCoordinates, initializeShapeCoordinateDesignations, testShapeCoordinateDesignations } from "./shapeCoordinateDesignations.js";
import { initializeShapes, testShapes } from "./shapes.js";
import { initializeTrips, testTrips } from "./trips.js";

function initialize() {
    process.chdir("./run");
    return initializeTrips() 
        && initializeShapes() 
        && initializeRouteShapeDesignations() 
        && initializeShapeCoordinateDesignations();
}
initialize();

testTrips("Q53+");
testShapes("SBS440520");
testRouteShapeDesignations("Q35");
testShapeCoordinateDesignations("SBS440520");
console.log(getRouteCoordinates("Q50"));