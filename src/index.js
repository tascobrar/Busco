import { initializeRouteShapeDesignations, testRouteShapeDesignations } from "./routeShapeDesignations.js";
import { getRouteCoordinates, initializeShapeCoordinateDesignations, testShapeCoordinateDesignations } from "./shapeCoordinateDesignations.js";
import { initializeShapes, testShapes } from "./shapes.js";
import { initializeTrips, testTrips } from "./trips.js";

let initialized = false;

function initialize() {
    if (initializeTrips() && initializeShapes() && initializeRouteShapeDesignations() && initializeShapeCoordinateDesignations()) {
        return initialized = true;
    }
    else {
        return initialized = false;
    }
}

export function main() {
    process.chdir("./run/");
    if (!initialize()) {
        console.error("Initialization failed!");
        return;
    }

    runTests();
}

function runTests() {
    testTrips("Q53+");
    testShapes("SBS440520");
    testRouteShapeDesignations("Q35");
    testShapeCoordinateDesignations("SBS440520");
    console.log(getRouteCoordinates("Q50"));
}

main();