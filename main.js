//Global Variables
var googleAPI = "AIzaSyDy-k7naixPLfTdtOFOWye58XgWfSUNrgY";
var hikingAPI = "200712037-04ab66ab7f810ab7c981e63fe3f4d800";
var map;
var infoWindow;

//DOM Queries
var mapLanding = document.getElementById("map");
var submitButton = document.getElementById("submit");
var locationForm = document.getElementById("location-form");

locationForm.addEventListener("submit", initiateApp);

function initiateApp(e) {
    mapLanding.innerHTML = "";
    geocode(e);
}

function geocode(e) {
    e.preventDefault();
    var location = document.getElementById("location-input").value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, function(results, status) {
        if (status === "OK") {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            getHikingTrails(latitude, longitude);
        }
    });
    console.log(location);
}

function initMap(lat, long, array) {
    map = new google.maps.Map(mapLanding, {
        center: { lat: lat, lng: long },
        zoom: 10
    });

    infoWindow = new google.maps.InfoWindow();

    for (let i = 0; i < array.length; i++) {
        addMarker(array[i]);
    }
}

function addMarker(data) {
    var marker = new google.maps.Marker({
        position: { lat: data.latitude, lng: data.longitude },
        map: map
    });

    google.maps.event.addListener(marker, "click", function() {
        var name = data.name;
        var location = data.location;
        var summary = data.summary;
        var difficultyAndRating = `Difficulty: ${data.difficulty} || Rating: ${data.stars}`
        var url = data.url;
        var info = `<b>${name}</b> <br/> <br/>${location} <br/> <br/>${summary} <br/> <br/>${difficultyAndRating} <br/> <br/>${url}`
        infoWindow.setContent(info)
        infoWindow.open(map, this);
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
