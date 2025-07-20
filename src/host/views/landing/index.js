document.title = "Busco";
        
const longitude = 40.73;
const latitude = -73.9074;
const zoom = 10.5;
const map = L.map('map').setView([longitude, latitude], zoom);
const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const bus = "Q35";
fetch(`http://localhost:3000/rawroutecoords?bus=${bus}`).then((response) => response.json().then((listOfCoordinatePairs) => {
    for (let i = 0; i < listOfCoordinatePairs.length; i ++) {
        const coordinatePairs = listOfCoordinatePairs[i];
        const polyline = L.polyline(coordinatePairs, {color: "blue"}).addTo(map);
        if (i == 0) {
            const startPopup = L.popup().setLatLng(L.latLng(coordinatePairs[0][0], coordinatePairs[0][1])).setContent(bus);
            map.openPopup(startPopup);
        }
    }
}));