import { InitializationResult, initialize } from "../main/initialization";
import { allTripEntries, TRIP_ROUTE_INDEX } from "../main/trips";

function main() {
    process.chdir("./run");
    const result: InitializationResult = initialize();
    if (!result.succeeded) {
        throw new Error(`Video initialization failed! ${result.message}`);
    }
    let allQueensBusRoutes: string[] = [];
    const allStandardQueensBusRoutes: Set<string> = new Set();
    const allExpressQueensBusRoutes: Set<string> = new Set();
    allTripEntries.forEach((tripEntry) => {
        let route: string = tripEntry[TRIP_ROUTE_INDEX];
        if (route.startsWith("QM")) {
            allExpressQueensBusRoutes.add(route);
        }
        else if (route.startsWith("Q")) {
            allStandardQueensBusRoutes.add(route);
        }
    });
    allQueensBusRoutes = [...allStandardQueensBusRoutes].concat([...allExpressQueensBusRoutes]);
}

main();