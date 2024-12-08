document.addEventListener('DOMContentLoaded', getMyLocation);
let watchId =  null;
let map = L.map('map')
navigator.geolocation.getCurrentPosition(displayLocation, displayError);
const ourCoords = { latitude: 0, longitude: 0};

function getMyLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
        map.setView([ourCoords.latitude, ourCoords.longitude], 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([ourCoords.latitude, ourCoords.longitude]).addTo(map);
        marker.bindPopup(`Your are here: ${ourCoords.latitude}, ${ourCoords.longitude}`).openPopup();
        document.getElementById("watch").onclick = watchLocation;
        document.getElementById("clearWatch").onclick = clearWatch;
        document.getElementById('apply').addEventListener('click', addPin)
    }
    else{
        alert("Oops, no geolocation support");
    }
}

function displayLocation(positon){
    let latitude = positon.coords.latitude;
    let longitude = positon.coords.longitude;
    let div = document.getElementById('location');
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    div.innerHTML += `(With ${positon.coords.accuracy} meters accuracy)`
    let km = computeDistance(positon.coords, ourCoords);
    let distance = document.getElementById("distance");
    distance.innerHTML = `You are ${km} km from the college`

    var marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`Your are here: ${latitude}, ${longitude}`).openPopup();
}

function displayError(error){
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code];
    if(error.code == 0 || error.code == 2){
        errorMessage = errorMessage + " " + error.message;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords){
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads =  degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6471;

    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
        Math.cos(startLatRads) * Math.cos(destLatRads) * 
        Math.cos(startLongRads - destLongRads)) * Radius;
    
        return distance;
}

function degreesToRadians(degrees){
    let radians = (degrees * Math.PI)/180;
    return radians;
}

function watchLocation(){
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError)
}

function clearWatch(){
    if(watchId){
        navigator.geolocation.clearWatch(watchId)
        watchId = null;
    }
}

function addPin(){
    let latitude = parseFloat(document.getElementById('latitude').value);
    let longitude = parseFloat(document.getElementById('longitude').value);
    if (isNaN(latitude) || isNaN(longitude)|| latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        alert("Incorect coord");
        return;
    }
    map.setView([latitude, longitude], 15);
    var marker = L.marker([latitude, longitude]).addTo(map)
}