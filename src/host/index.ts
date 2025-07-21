import { InitializationResult, initialize } from "../main/initialization";

import express, { Application } from "express"; 
import { allTripEntries, TRIP_ROUTE_INDEX } from "../main/trips";
import { getRouteCoordinates } from "../main/shapeCoordinateDesignations";

const PORT: number = 3000;

function main() {
    process.chdir("./run");
    let result: InitializationResult = initialize();
    if (!result.succeeded) {
        throw new Error(`Map initialization failed! ${result.message}`);
    }
    process.chdir(__dirname);
    console.log(__dirname);
    const app: Application = express();
    app.use("/landing", express.static("views/landing/"));
    app.get('/rawroutecoords', (req, res) => {
        let bus = (req.query["bus"] as string).replace("SBS", "+");
        res.json(getRouteCoordinates(bus));
    });
    app.listen(PORT, "localhost", () => {
        console.log(`Running map server on port ${PORT}`);
    });
}

main();