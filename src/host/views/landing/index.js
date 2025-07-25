document.title = "Busco";
        
const longitude = 40.73;
const latitude = -73.9074;
const zoom = 11;
const maxZoom = 19;
const attribution = `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.mta.info/developers">MTA (developer resources)</a>`;

const map = L.map('map').setView([longitude, latitude], zoom);
const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: maxZoom,
    attribution: attribution
}).addTo(map);
map.setZoom(zoom);

let displayedRouteElements;

async function getRawRouteCoords(bus) {
    return await fetch(`http://localhost:3000/rawroutecoords?bus=${bus}`).then((response) => response.json());
}

function setDisplayedRoute(bus) {
    if (displayedRouteElements) {
        map.removeLayer(displayedRouteElements);
    }
    displayedRouteElements = L.layerGroup();
    getRawRouteCoords(bus).then((listOfCoordinatePairs) => {
        for (let i = 0; i < listOfCoordinatePairs.length; i ++) {
            const coordinatePairs = listOfCoordinatePairs[i];
            const polyline = L.polyline(coordinatePairs, {color: "blue"}).addTo(displayedRouteElements);
        
            if (i == 0) {
                const startPopup = L.popup().setLatLng(L.latLng(coordinatePairs[0][0], coordinatePairs[0][1])).setContent(bus);
                startPopup.addTo(displayedRouteElements);
                map.openPopup(startPopup);
            }
        }
    });
    displayedRouteElements.addTo(map);
}