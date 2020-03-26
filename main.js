//Global Variables
var googleAPI = "AIzaSyDy-k7naixPLfTdtOFOWye58XgWfSUNrgY";
var hikingAPI = "200712037-04ab66ab7f810ab7c981e63fe3f4d800";
var map;

//DOM Queries
var mapLanding = document.getElementById("map");
var submitButton = document.getElementById("submit");
var locationForm = document.getElementById("location-form");

locationForm.addEventListener("submit", initiateApp);

function initiateApp(e) {
    mapLanding.innerHTML = "";
    geocode(e)
}

function geocode(e) {
    e.preventDefault();
    var location = document.getElementById("location-input").value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, function(results, status) {
        if (status === "OK") {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            getHikingTrails(latitude, longitude)
        }
    });
    console.log(location);
}

function initMap() {
    map = new google.maps.Map(mapLanding, {
        center: { lat: latitude, lng: longitude },
        zoom: 10
    });
}

function getHikingTrails(lat, long) {
    $.ajax({
        method: "GET",
        url:
            "https://www.hikingproject.com/data/get-trails?lat=" +
            lat +
            "&lon=" +
            long +
            "&maxDistance=15&key=" +
            hikingAPI,
        success: function(data) {
            var trailArray = data.trails;
            console.log(trailArray);
            initMap(lat, long, trailArray);
        },
        error: function(err) {
            console.error(err);
        }
    });
}
