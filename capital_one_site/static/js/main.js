var map,
  heatmap;

var markers = [];

var priceMarker;

var centerLatLong = {
  lat: 37.760,
  lng: -122.445
}

function initMap() {
  map_price = new google.maps.Map(document.getElementById('map_price'), {
    zoom: 13,
    center: centerLatLong,
    mapTypeId: 'roadmap'
    // mapTypeId: 'hybrid',
  });

  heatmap_price = new google.maps.visualization.HeatmapLayer({
    data: getPointsForPrice(), map: map_price, dissipating: true,
    // Comment next 2 for density map
    radius: 10,
    maxIntensity: 7
  });

  map_density = new google.maps.Map(document.getElementById('map_density'), {
    zoom: 13,
    center: centerLatLong,
    mapTypeId: 'roadmap'
    // mapTypeId: 'hybrid',
  });

  heatmap_density = new google.maps.visualization.HeatmapLayer({
    data: getPointsForDensity(), map: map_density, dissipating: true,
    // Comment next 2 for density map
    radius: 12,
    opacity: .6
    // maxIntensity: 15
  });

  // Place a draggable marker on the map
  priceMarker = new google.maps.Marker({
    position: centerLatLong,
    map: map_price,
    draggable:true
  });

  priceMarker.addListener('drag', handleEvent);
  priceMarker.addListener('dragend', handleEvent);
  $("#userLat").on('change', updateButton);
  $("#typeSelect").on('change', updateButton);


console.log("test")
}

function toggleHeatmap() {
  heatmap.setMap(
    heatmap.getMap()
    ? null
    : map);
}

function getPointsForDensity() {
  var coords = [];
  for (let t of data) {
    // 1 for density map
    coords.push({
      location: new google.maps.LatLng(t.fields.lat, t.fields.long),
      weight: 1
    });
  }
  return coords
}

function getPointsForPrice() {
  var coords = [];
  for (let t of data) {
    var w = t.fields.price_night;
    w = w / t.fields.total_places_in_neighborhood;
    // w to 1 for density map
    coords.push({
      location: new google.maps.LatLng(t.fields.lat, t.fields.long),
      weight: w
    });
  }
  return coords
}

// Sets the map on all markers in the array.
function resetMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap();
  }
}

function calculateIdealPrice(radius){
  var lat = document.getElementById("userLat").value;
  var lng = document.getElementById("userLong").value;
  var roomType = document.getElementById("typeSelect").value;
  console.log(radius);

  console.log(lat +', ' + lng);
  var userCoord = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  }
  resetMarkers();

  priceMarker.setPosition(new google.maps.LatLng(userCoord));

  var pricesInRadius = [];
  var places = [];
  for (let t of data) {
    var userCoordObj = new google.maps.LatLng(userCoord);
    var listingCoordObj = new google.maps.LatLng(t.fields.lat, t.fields.long);
    if (isInRadius(userCoordObj, listingCoordObj, radius) && t.fields.room_type==roomType){
      pricesInRadius.push(t.fields.price_night);
      places.push(t);
    }
  }
  // Sort array so prices increase
  pricesInRadius.sort(function(a, b){return a - b});

  console.log("Before");
  console.log(pricesInRadius);
  pricesInRadius = removeOutliers(pricesInRadius, roomType);
  if (pricesInRadius.length>4){
    pricesInRadius = removeUpperHalf(pricesInRadius);
  }

  console.log("After");
  console.log(pricesInRadius);
  // var leftSide = arrayName.splice(0, Math.floor(arrayName.length / 2));

  var sum = sumArray(pricesInRadius);
  console.log("Sum: " + sum);

  var suggested = parseFloat(sum/(pricesInRadius.length)).toFixed(2);
  console.log("suggested: " + suggested)
  console.log(pricesInRadius);

  console.log(places);

  if(places.length < 2){
    suggested = calculateIdealPrice(radius+100);
  }

  var predictedProfit = (suggested*7).toFixed(2);
  document.getElementById('priceTag').innerText = "Sugggested Price/Night: $"+ suggested;
  document.getElementById('profitTag').innerText = "Predicted Average Profit/Week: $"+ predictedProfit;
  document.getElementById('priceButton').innerText = "Suggest Price!";
  document.getElementById('priceButton').style.background = "#007bff";
  document.getElementById('priceButton').style.border = "#007bff";
  return suggested;
}
function sumArray(s) {
    total = 0;
    for (let e of s){
      total = total + parseFloat(e);
    }
    return total;
}
function isInRadius(userCoord, listingCoord, radius){
  if(google.maps.geometry.spherical.computeDistanceBetween(userCoord, listingCoord) < (parseInt(radius))){
    return true;
  }
  return false;
}

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

function removeUpperHalf(prices){
  return prices.splice(0, Math.floor(prices.length / 2));
}

function handleEvent(event) {
    document.getElementById('userLat').value = event.latLng.lat();
    document.getElementById('userLong').value = event.latLng.lng();
    calculateIdealPrice(400);
}

function updateButton(){
  document.getElementById('priceButton').innerText = "Update Suggested Price!";
  document.getElementById('priceButton').style.background = "#3fe974";
  document.getElementById('priceButton').style.border = "#3fe974";
}
