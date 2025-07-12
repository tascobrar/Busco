import { InitializationResult, initialize } from "../main/initialization";

import express, { Application } from "express"; 

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
    app.get('/', (req, res) => {
        res.writeHead(200, "{Content-Type: text/html"); 
        res.end(`
            yo   
        `);
    });
}

main();