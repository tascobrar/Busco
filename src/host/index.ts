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
    app.set("view engine", "ejs");
    app.set("views", "./views");
    app.get('/busmap', (req, res) => {
        let bus = req.query["bus"];
        const data = {
            title: `Busco: ${bus} bus map`,
            coordinateString: JSON.stringify(getRouteCoordinates(bus.toString()))
        };
        res.render("index", {data});
    });
    app.listen(PORT, "localhost", () => {
        console.log(`Running map server on port ${PORT}`);
    });
}

main();