var map,
  heatmap;

var markers = [];

var priceMarker;
// Lat Long Point to Center Map
var centerLatLong = {
  lat: 37.760,
  lng: -122.445
}
// Run by Google Maps JavaScript API to initialize Map components
function initMap() {
  map_price = new google.maps.Map(document.getElementById('map_price'), {
    zoom: 13,
    center: centerLatLong,
    mapTypeId: 'roadmap'
  });
  // Initialize Price Heatmap
  heatmap_price = new google.maps.visualization.HeatmapLayer({
    data: getPointsForPrice(), map: map_price,
    dissipating: true,
    radius: 12,
    maxIntensity: 1200,
    opacity: .6
  });

  map_density = new google.maps.Map(document.getElementById('map_density'), {
    zoom: 13,
    center: centerLatLong,
    mapTypeId: 'roadmap'
  });
  //Initialize AirBnB Density Heatmap
  heatmap_density = new google.maps.visualization.HeatmapLayer({
    data: getPointsForDensity(), map: map_density,
    dissipating: true,
    radius: 12,
    opacity: .6
  });

  // Place a draggable marker on the price map
  priceMarker = new google.maps.Marker({
    position: centerLatLong,
    map: map_price,
    draggable:true
  });
  // Listeners to update predicted price per night when marker is dragged
  priceMarker.addListener('drag', handleEvent);
  priceMarker.addListener('dragend', handleEvent);

  // Change button color if user changes coordinates in input fields
  $("#userLat").on('change', updateButton);
  $("#typeSelect").on('change', updateButton);
}
//Returns array AirBnB locations in Google Map LatLngs format
function getPointsForDensity() {
  var coords = [];
  for (let t of data) {
    coords.push({
      location: new google.maps.LatLng(t.fields.lat, t.fields.long),
      weight: 1
    });
  }
  return coords
}
//Returns array AirBnB locations and prices in Google Map LatLngs format with price as weight
function getPointsForPrice() {
  var coords = [];
  // Loop through alla data points for AirBnB in San Francisco
  for (let t of data) {
    // Important difference between price and density heatmaps:
    // Price heatmap sets the price of an AirBnB data point as the weight of that point on the map_price
    // This makes more expensive areas of the city appear more RED
    var w = t.fields.price_night;
    coords.push({
      location: new google.maps.LatLng(t.fields.lat, t.fields.long),
      weight: w
    });
  }
  return coords
}

// Removes all markers currently on the map
function resetMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap();
  }
}
// Returns the price per night that an AirBnB should should be based on its location
// Essentially returns the price at the 25th percentile of the points in a given radius around a specific location
function calculateIdealPrice(radius){
  var lat = document.getElementById("userLat").value;
  var lng = document.getElementById("userLong").value;
  var roomType = document.getElementById("typeSelect").value;
  // console.log(radius);
  //
  // console.log(lat +', ' + lng);
  var userCoord = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  }
  // Removes current marker position
  resetMarkers();
  // Set marker to LatLng position specified by user
  priceMarker.setPosition(new google.maps.LatLng(userCoord));

  var pricesInRadius = [];
  // Loops through points on map, testing for distance from inputted LatLong
  for (let t of data) {
    var userCoordObj = new google.maps.LatLng(userCoord);
    var listingCoordObj = new google.maps.LatLng(t.fields.lat, t.fields.long);
    // If distace is smaller than given radius and the room type matches that of the search, adds price of this data point to a price array
    if (isInRadius(userCoordObj, listingCoordObj, radius) && t.fields.room_type==roomType){
      pricesInRadius.push(t.fields.price_night);
    }
  }
  // Sort array so prices increase
  pricesInRadius.sort(function(a, b){return a - b});

  // console.log("Before Outliers Removed");
  // console.log(pricesInRadius);

  // Removes clear outliers in the data points depending on how large the points array is
  pricesInRadius = removeOutliers(pricesInRadius, roomType);

  // Returns the lower half of the sorted price array, used in future calculations
  // *Only performs this operation if the array length is greater than 4
  if (pricesInRadius.length>4){
    pricesInRadius = removeUpperHalf(pricesInRadius);
  }

  // console.log("After Outliers Removed");
  // console.log(pricesInRadius);

  // Adds up the values in a given array
  var sum = sumArray(pricesInRadius);
  // Returns the suggested price per night by finding the 25th percentile (average of lower half) of the array of prices
  var suggested = parseFloat(sum/(pricesInRadius.length)).toFixed(2);
  // console.log("suggested: " + suggested);
  // console.log(pricesInRadius);

  // Searches on a larger radius if the search does not find sufficient places in a given radius to accurately make a price predicition
  // This is a recursive call
  if(pricesInRadius.length < 2){
    suggested = calculateIdealPrice(radius+200);
  }

  // Updates predicition revenue in  a week based on the suggested price per night for specified room type
  var predictedRevenue = (suggested*7).toFixed(2);
  document.getElementById('priceTag').innerText = "Sugggested Price/Night: $"+ suggested;
  document.getElementById('revenueTag').innerText = "Predicted Average Revenue/Week: $"+ predictedRevenue;
  document.getElementById('priceButton').innerText = "Suggest Price!";
  document.getElementById('priceButton').style.background = "#007bff";
  document.getElementById('priceButton').style.border = "#007bff";
  // Return statement used when this function is called recursively
  return suggested;
}

// Returns sum of values in a given array
function sumArray(s) {
    total = 0;
    for (let e of s){
      total = total + parseFloat(e);
    }
    return total;
}

// Returns true if a data point falls within the search radius of the user-specified location
// Else returns false
function isInRadius(userCoord, listingCoord, radius){
  if(google.maps.geometry.spherical.computeDistanceBetween(userCoord, listingCoord) < (parseInt(radius))){
    return true;
  }
  return false;
}

// Removes outliers in price data based on how large the price array is
// How many outliers to remove is an arbitrary number found by personal analysis of the data
// Returns array without these outliers
function removeOutliers(prices, typeRoom){
  var l = prices.length;
  if (l>2){
    if (l<5){
      // Remove highest price
      prices.pop();
    }
    else if (l<26){
      // Remove 3 highest prices and 1 lowest
      prices = prices.slice(1, l-2)
    }
    else if (l<50){
      // Remove 3 highest prices and 1 lowest
      prices = prices.slice(1, l-3)
    }
    else if (l<100){
      // Remove 4 highest prices and 3 lowest
      prices = prices.slice(3, l-4)
    }
    else {
      // Remove 8 highest prices and 4 lowest
      prices = prices.slice(4, l-8)
    }
  }
  // If a room type is listed as "private room" or "shared room," prices greater than $400/night are clear outliers
  // This step allows them to be removed
  if(typeRoom == "Private room" || typeRoom == "Shared room"){
    var temp = [];
    for (let e of prices){
      if (parseFloat(e)<400){
        temp.push(e);
      }
    }
    return temp
  }
  return prices;
}

// Returns the bottom half of an array
// Precondition: array is already sorted
function removeUpperHalf(prices){
  return prices.splice(0, Math.floor(prices.length / 2));
}

// Function called when pin is dragged or user changes LatLong input
function handleEvent(event) {
    document.getElementById('userLat').value = event.latLng.lat();
    document.getElementById('userLong').value = event.latLng.lng();
    calculateIdealPrice(1800);
}
// Turns submit button green when user changes LatLong input fields or room type
function updateButton(){
  document.getElementById('priceButton').innerText = "Update Suggested Price!";
  document.getElementById('priceButton').style.background = "#3fe974";
  document.getElementById('priceButton').style.border = "#3fe974";
}
