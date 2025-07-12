import { initializeRouteShapeDesignations, testRouteShapeDesignations } from "./routeShapeDesignations";
import { getRouteCoordinates, initializeShapeCoordinateDesignations, testShapeCoordinateDesignations } from "./shapeCoordinateDesignations";
import { initializeShapes, testShapes } from "./shapes";
import { initializeTrips, testTrips } from "./trips";
import { failedInitialization, InitializationResult, SUCCESS } from "./initialization";

let initializationResult: InitializationResult;

export function initialize(): InitializationResult {
    for (const initializationFunction of [initializeTrips, initializeShapes, initializeRouteShapeDesignations, initializeShapeCoordinateDesignations]) {
        let result = initializationFunction();
        if (!result.succeeded) {
            return initializationResult = failedInitialization(`Initialization failed while running ${initializationFunction.name}: ${result.message}`);
        }
    }
    return initializationResult = SUCCESS;
}

export function main(): void {
    process.chdir("./run/");
    let initializationResult = initialize();
    if (!initializationResult.succeeded) {
        console.error(`Main initialization failed! ${initializationResult.message}`);
        return;
    }
}

// main();