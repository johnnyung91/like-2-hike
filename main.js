//Global Variables
var googleAPI = "AIzaSyDy-k7naixPLfTdtOFOWye58XgWfSUNrgY";
var hikingAPI = "200712037-04ab66ab7f810ab7c981e63fe3f4d800";
var map;
var latitude = null;
var longitude = null;

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
            initMap();
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
        url: "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=10&key=" + hikingAPI,
        success: function(data) {
            console.log(data.trails)
        },
        error: function(err) {
            console.error(err);
        }
    })

}

// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 8,
//       center: {lat: -34.397, lng: 150.644}
//     });
//     var geocoder = new google.maps.Geocoder();

//     document.getElementById('submit').addEventListener('click', function() {
//       geocodeAddress(geocoder, map);
//     });
//   }

//   function geocodeAddress(geocoder, resultsMap) {
//     var address = document.getElementById('location-input').value;
//     geocoder.geocode({'address': address}, function(results, status) {
//       if (status === 'OK') {
//         resultsMap.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//           map: resultsMap,
//           position: results[0].geometry.location
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   }
