
// if (!navigator.geolocation) {
//     document.getElementById("status").textContent = "Geolocation not supported";
//     console.error("Geolocation not supported");
// } else {
//     navigator.geolocation.watchPosition(
//         handleGeolocationSuccess, 
//         handleGeolocationError, 
//         { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
//     );
// }

if (!window.DeviceOrientationEvent) {
    document.getElementById("status").textContent = "DeviceOrientation not supported";
    console.error("DeviceOrientation not supported");
} else {
    window.addEventListener('deviceorientation', handleOrientation);
}


function handleGeolocationSuccess(position) {
    console.log("not implemented yet");
}

function handleGeolocationError() {
    console.log("not implemented yet");
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