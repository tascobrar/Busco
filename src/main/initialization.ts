export interface InitializationResult {
    succeeded: boolean
    message: string
}

export const SUCCESS: InitializationResult = { 
    succeeded: true,
    message: null
};
export function failedInitialization(message: string): InitializationResult {
    return {
        succeeded: false,
        message: message
    };
}

import { initializeRouteShapeDesignations, testRouteShapeDesignations } from "./routeShapeDesignations";
import { getRouteCoordinates, initializeShapeCoordinateDesignations, testShapeCoordinateDesignations } from "./shapeCoordinateDesignations";
import { initializeShapes, testShapes } from "./shapes";
import { initializeTrips, testTrips } from "./trips";

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