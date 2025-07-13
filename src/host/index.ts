import { InitializationResult, initialize } from "../main/initialization";

import express, { Application } from "express"; 
import { allTripEntries, TRIP_ROUTE_INDEX } from "../main/trips";

const PORT: number = 3000;

function main() {
    process.chdir("./run");
    let result: InitializationResult = initialize();
    if (!result.succeeded) {
        throw new Error(`Map initialization failed! ${result.message}`);
    }
    const app: Application = express();
    app.listen(PORT, "localhost", () => {
        console.log(`Running map server on port ${PORT}`);
    });
    app.get('/busmap', (req, res) => {
        res.writeHead(200, "{Content-Type: text/html"); 
        let bus = req.query["bus"];
        if (!bus) {
            res.end(`
                you did not select a bus
            `);
            return;
        }
        res.end(`
            you selected the ${bus}
            here's some information
            ${allTripEntries.filter((tripEntry) => tripEntry[TRIP_ROUTE_INDEX] == bus)}
        `)
    });
}

main();