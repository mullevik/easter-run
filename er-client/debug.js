
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


function handleGeolocationSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById("latitude").textContent = latitude;
    document.getElementById("longitude").textContent = longitude;
}

function handleGeolocationError() {
    console.error('Unable to retrieve your location');
}


function handleOrientation(event) {
    if (event.alpha !== null && event.alpha !== undefined) {
        const bearing = event.alpha.toFixed(2); // Compass direction in degrees
        document.getElementById("bearing").textContent = bearing + "°";
    } else {
        console.error("Bearing not available in event:", event);
    }
}