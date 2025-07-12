import { initialize } from "./initialization";

export function main(): void {
    process.chdir("./run/");
    let initializationResult = initialize();
    if (!initializationResult.succeeded) {
        console.error(`Main initialization failed! ${initializationResult.message}`);
        return;
    }
}

main();