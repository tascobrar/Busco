import { initializeRouteShapeDesignations, testRouteShapeDesignations } from "./routeShapeDesignations.js";
import { getRouteCoordinates, initializeShapeCoordinateDesignations, testShapeCoordinateDesignations } from "./shapeCoordinateDesignations.js";
import { initializeShapes, testShapes } from "./shapes.js";
import { initializeTrips, testTrips } from "./trips.js";

let initialized: boolean = false;

function initialize(): boolean {
    if (initializeTrips() && initializeShapes() && initializeRouteShapeDesignations() && initializeShapeCoordinateDesignations()) {
        return initialized = true;
    }
    else {
        return initialized = false;
    }
}

export function main(): void {
    process.chdir("./run/");
    if (!initialize()) {
        console.error("Initialization failed!");
        return;
    }

    runTests();
}

function runTests(): void {
    testTrips("Q53+");
    testShapes("SBS440520");
    testRouteShapeDesignations("Q35");
    testShapeCoordinateDesignations("SBS440520");
    console.log(getRouteCoordinates("Q50"));
}

main();