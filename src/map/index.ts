import { initialize } from "../main/initialization";

function main() {
    process.chdir("./run");
    let result = initialize();
    if (!result.succeeded) {
        throw new Error(`Map initialization failed! ${result.message}`);
    }

}

main();