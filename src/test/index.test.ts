import { initialize } from "../main/initialization";
import { allRoutesToShapes } from "../main/routeShapeDesignations";
import { allShapesToCoordinates } from "../main/shapeCoordinateDesignations";
import { allShapeEntries, SHAPE_SHAPE_INDEX } from "../main/shapes";
import { allTripEntries, TRIP_ROUTE_INDEX, tripFileToTripEntries } from "../main/trips";

beforeAll(() => {
    process.chdir("./run/");
    let result = initialize();
    if (!result.succeeded) {
        throw new Error(`Test initialization failed! ${result.message}`);
    }
});

// todo: add more detailed tests (potentially checking the actual data of the entries) (matching the files/agencies with routes)

describe("trips tests", () => {
    test("allTripEntries contains trip entries of multiple agencies", () => {
        const allRoutes: string[] = allTripEntries.map((tripEntry) => tripEntry[TRIP_ROUTE_INDEX]);
        expect(allRoutes).toContain("M23+");
        expect(allRoutes).toContain("Q64");
        expect(allRoutes).toContain("B35");
    });
});

describe("shapes test", () => {
    test("allShapeEntries contains shape entries of multiple agencies", () => {
        const allShapes: string[] = allShapeEntries.map((shapeEntry) => shapeEntry[SHAPE_SHAPE_INDEX]);
        expect(allShapes).toContain("Q240239");
        expect(allShapes).toContain("Q030116");
        expect(allShapes).toContain("S530021");
    });
});

describe("route shape designations test", () => {
    test("allRoutesToShapes contains routes of multiple agencies", () => {
        const allRoutes: string[] = [...allRoutesToShapes.keys()];
        expect(allRoutes).toContain("Q70+");
        expect(allRoutes).toContain("Q21");
        expect(allRoutes).toContain("BX12");
    });
});

describe("shape coordinate designations test", () => {
    test("allShapesToCoordinates contains shapes of multiple agencies", () => {
        const allShapes: string[] = [...allShapesToCoordinates.keys()];
        expect(allShapes).toContain("SBS860058");
        expect(allShapes).toContain("SBS440528");
        expect(allShapes).toContain("Q350112");
    });
});