
const BASE_URL = "http://127.0.0.1:8080/";
const UPDATE_FREQUENCY = 1000;

let lastKnownCoordinates = null;

if (!navigator.geolocation) {
    document.getElementById("status").textContent = "Geolocation not supported";
    console.error("Geolocation not supported");
} else {
    navigator.geolocation.watchPosition(
        handleGeolocationSuccess, 
        handleGeolocationError, 
        { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
    );
}

if (!window.DeviceOrientationEvent) {
    document.getElementById("status").textContent = "DeviceOrientation not supported";
    console.error("DeviceOrientation not supported");
} else {
    window.addEventListener('deviceorientation', handleOrientation);
}

setInterval(() => {checkForNewDeviceDataBasedOnPosition(lastKnownCoordinates);}, UPDATE_FREQUENCY);


function handleGeolocationSuccess(position) {
    lastKnownCoordinates = position.coords;
}

function handleGeolocationError() {
    lastKnownCoordinates = null;
}


function handleOrientation(event) {
    if (event.alpha !== null && event.alpha !== undefined) {
        const alphaDegrees = event.alpha.toFixed(2);
        const compasRotation = 360. - alphaDegrees;
        document.getElementById("compass").setAttribute('transform', `translate(100, 100) rotate(${compasRotation})`);
    } else {
        document.getElementById("compass").setAttribute('transform', "translate(100, 100) rotate(0)");
    }
}

function checkForNewDeviceDataBasedOnPosition(coordinates) {
    if (coordinates === null) {
        console.error("Unable to check for new device data because of unavailable position");
        document.getElementById("needle").setAttribute('transform', "rotate(0)");
        return;
    }

    fetchDeviceData(
        coordinates.latitude, 
        coordinates.longitude, 
        updateWithNewDeviceData, 
        (error) => {
            console.log("Unable to fetch new device data:", error);
        }
    );
}

function fetchDeviceData(latitude, longitude, successHandler, errorHandler) {
    const url = new URL(BASE_URL);
    url.searchParams.append("latitude", latitude);
    url.searchParams.append("longitude", longitude);
    fetch(url, {
        method: 'GET',
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        successHandler(data.bearing, data.strength);
    })
    .catch(error => {
        errorHandler(error);
    });
}

function updateWithNewDeviceData(bearing, signalStrength) {
    // assuming that bearing is:
    // 0 for north
    // 90 for east
    // 180 for south
    // -90 for west
    const needleRotation = bearing < 0. ? 360 + bearing : bearing;
    document.getElementById("needle").setAttribute('transform', `rotate(${needleRotation})`);

    document.getElementById("signal_strength").setAttribute('value', `${signalStrength}`);
}