//Global Variables
var googleAPI = "AIzaSyDy-k7naixPLfTdtOFOWye58XgWfSUNrgY";
var hikingAPI = "200712037-04ab66ab7f810ab7c981e63fe3f4d800";
var latitude = 34.035627;
var longitude = -118.012688;


//DOM Queries

var submitButton = document.getElementById("submit")


function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: latitude, lng: longitude }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById("submit").addEventListener("submit", function() {
        geocodeAddress(geocoder, map);
    });
}

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById("location-input").value;
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
