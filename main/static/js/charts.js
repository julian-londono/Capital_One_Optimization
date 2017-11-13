// When user scrolls to charts, charts render with animation
// This was adapted from a StackOverFlow.com solution:
// https://stackoverflow.com/questions/18772547/how-to-make-the-chart-js-animate-when-scrolled-to-that-section
var inView1 = false;
var inView2 = false;
var inView3 = false;

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

$(window).scroll(function() {
    if (isScrolledIntoView('#barGraph1') && !inView1) {
        if (inView1) { return; }
        inView1 = true;
        loadBarGraph1();
    }
    if (isScrolledIntoView('#barGraph2')&& !inView2) {
        if (inView2) { return; }
        inView2 = true;
        loadBarGraph2();
    }
    if (isScrolledIntoView('#scatterPlot1')&& !inView3) {
        if (inView3) { return; }
        inView3 = true;
        loadScatter1();
    }
});

// window.onload = function () { loadAll() }
var today = moment();
var neighborhoodArray = ["Golden Gate Park","Noe Valley","Castro/Upper Market","Glen Park","Outer Sunset","Outer Mission","Mission","Bernal Heights","Presidio Heights","Visitacion Valley","Marina","Diamond Heights","Parkside","North Beach","Ocean View","Haight Ashbury","Excelsior","Potrero Hill","Twin Peaks","West of Twin Peaks","Inner Richmond","Seacliff","Western Addition","Outer Richmond","Nob Hill","Crocker Amazon","Inner Sunset","Financial District","Russian Hill","Pacific Heights","Bayview","Chinatown","South of Market","Treasure Island/YBI","Lakeshore","Downtown/Civic Center","Presidio"];

var backgroundColorArray = ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)'];

var borderColorArray = ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)'];

var responseTimeArray = ["Within An Hour", "Within A Few Hours", "Within A Day"];

// Renders all chart elements
function loadBarGraph1(){
  var bar1 = document.getElementById("barGraph1").getContext('2d');
  Chart.defaults.global.defaultColor = 'rgba(217, 0, 65,1)';
  var barChart = new Chart(bar1, {
    type: 'bar',
    data: {
        labels: neighborhoodArray,
        datasets: [{
            // The following line was used during development to call a series of function that return the data used to populate this chart
            // This data was saved in various arrays in chart_data.js for production to decrease loading time
            // data: getPointsForLocationScore(),
            data: bar1Data, //Loads data array from chart_data.js
            backgroundColor: backgroundColorArray,
            borderColor: borderColorArray,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Neighborhood of San Francisco',
                fontSize: 15
              }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Average Location Rating',
                  fontSize: 15
                }
            }]
        },
        title: {
          display: true,
          text: "Neighborhood Location Score",
          fontSize: 20
        },
        legend: {
            display: false
        }
    }
  });
}
function loadBarGraph2(){
  var bar2 = document.getElementById("barGraph2").getContext('2d');
  var barChart = new Chart(bar2, {
    type: 'bar',
    data: {
        labels: responseTimeArray,
        datasets: [{
            // The following line was used during development to call a series of function that return the data used to populate this chart
            // This data was saved in various arrays in chart_data.js for production to decrease loading time
            // data: getPointsForResponseTimeCorrelation(),
            data: bar2Data, //Loads data array from chart_data.js
            backgroundColor: backgroundColorArray,
            borderColor: borderColorArray,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Response Time',
                fontSize: 15
              }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:false
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Average Host Rating',
                  fontSize: 15
                }
            }]
        },
        title: {
          display: true,
          text: "Response Time vs Average Host Score",
          fontSize: 20
        },
        legend: {
            display: false
        }
    }
  });
}

function loadScatter1(){
  var scatter1 = document.getElementById("scatterPlot1").getContext('2d');
  var scatterChart = new Chart(scatter1, {
    responsive: true,
    maintainAspectRatio: true,
    type: 'scatter',
    data: {
        datasets: [{
            // The following line was used during development to call a series of function that return the data used to populate this chart
            // This data was saved in various arrays in chart_data.js for production to decrease loading time
            // data: getPointsForHostSince(),
            data: scatter1Data, //Loads data array from chart_data.js
            backgroundColor: "rgba(217, 0, 65,1)"
        }]
    },

    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                  display: true,
                  labelString: 'Days as AirBnB Host',
                  fontSize: 15
                }
            }],
            yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Average Host Score',
                  fontSize: 15
                }
            }]
        },
        title: {
          display: true,
          text: "Days as Host vs Average Rating",
          fontSize: 20
        },
        legend: {
            display: false
        }
    }
  });
}

// Returns data array for scatter plot of "days as host" vs "average scrore"
function getPointsForHostSince(){
  var pointArray = [];
  // Loops through data points, separating them by cohorts of 25 days, averaging the score for each cohort
  for (low = 0, high = 25; high <3000; low+=25, high+=25){
    var pointsInCohort = [];
    for (let p of data){
      var host_since = p.fields.host_since;
      var score = p.fields.score_overall;
      // Uses Moment.JS to find how many days since the host started being an AirBnB Host
      var daysAsHost = today.diff(host_since, 'days');
      if (daysAsHost<3000 && daysAsHost>=low && daysAsHost<=high){
        pointsInCohort.push({daysAsHost, score});
      }
    }
    // Returns array with average score for given cohort
    pointArray.push(compileHostSincePoints(pointsInCohort));
  }
  return pointArray;
}

function getPointsForResponseTimeCorrelation(){
  var pointArray = [];
  // Loops through data points, separating them by cohorts based "response time", averaging the score for each cohort
  for (i = 0; i <responseTimeArray.length; i++){
    var pointsInCohort = [];
    for (let p of data){
      var responseTime = p.fields.host_response_time;
      var score = p.fields.score_overall;
      if ((responseTime).toString() == "within an hour") {responseTime = "Within An Hour";}
      if ((responseTime).toString() == "within a few hours") {responseTime = "Within A Few Hours";}
      if ((responseTime).toString() == "within a day") {responseTime = "Within A Day";}
      // Excludes "N/A" response time, adds points
      if (responseTime != 'N/A' &&responseTime == responseTimeArray[i]){
        pointsInCohort.push({responseTime, score});
      }
    }
    if (pointsInCohort.length>0){
      pointArray.push(compileResponseRatePoints(pointsInCohort));
    }

  }
  return pointArray;
}

// Returns data array for bar graph of "locations" and their "average location scrore"
function getPointsForLocationScore(){
  var pointArray = [];
  // Loops through data points, separating them by cohorts based "neighborhood", averaging the score for each cohort
  for (i=0; i<neighborhoodArray.length; i++){
    var pointsInCohort = [];
    for (let p of data){
      var neighborhood = p.fields.neighborhood;
      var score = p.fields.score_location;
      if (neighborhood == neighborhoodArray[i]){
        pointsInCohort.push({neighborhood, score});
      }
    }
    // Returns array with average score for given cohort
    pointArray.push(compileLocationPoints(pointsInCohort));
  }
  pointArray.sort(function(a, b) {
    return parseFloat(b.y) - parseFloat(a.y);
  });
  return pointArray;
}

// Returns array with average score for given location cohort
function compileLocationPoints(points){
  var neighborhoodName = points[0].neighborhood;
  var averageScoreArray = [];
  for (let p of points){
    averageScoreArray.push(p.score);
  }
  var averageScore = averageArray(averageScoreArray).toFixed(2);
  return {x:neighborhoodName,y:averageScore};
}

// Returns array with average score for given response time cohort
function compileResponseRatePoints(points){
  var responseTime = points[0].responseTime;
  var averageScoreArray = [];
  for (let p of points){
    averageScoreArray.push(p.score);
  }
  var averageScore = averageArray(averageScoreArray).toFixed(2);
  return {x:responseTime,y:averageScore};
}

// Returns array with average score for given "days as host" cohort
function compileHostSincePoints(points){
  var maxDaysInCohort = 0;
  var averageScoreArray = [];
  for (let p of points){
    maxDaysInCohort = Math.max(maxDaysInCohort, p.daysAsHost);
    averageScoreArray.push(p.score);
  }
  var averageScore = averageArray(averageScoreArray).toFixed(2);
  return {x:maxDaysInCohort,y:averageScore};
}

// Returns the average value of a given array
function averageArray(e){
  total = 0;
  for (let point of e){
    total = total + point;
  }
  return total/e.length;
}
