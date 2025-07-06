import { initializeTrips } from "./trips.js";

function initialize() {
    if (!initializeTrips()) return false;
    return true;
}

initialize();