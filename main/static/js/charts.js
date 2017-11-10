window.onload = function () { loadAll() }
var today = moment();
var neighborhoodArray = ["Golden Gate Park","Noe Valley","Castro/Upper Market","Glen Park","Outer Sunset","Outer Mission","Mission","Bernal Heights","Presidio Heights","Visitacion Valley","Marina","Diamond Heights","Parkside","North Beach","Ocean View","Haight Ashbury","Excelsior","Potrero Hill","Twin Peaks","West of Twin Peaks","Inner Richmond","Seacliff","Western Addition","Outer Richmond","Nob Hill","Crocker Amazon","Inner Sunset","Financial District","Russian Hill","Pacific Heights","Bayview","Chinatown","South of Market","Treasure Island/YBI","Lakeshore","Downtown/Civic Center","Presidio"];

var backgroundColorArray = ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 99, 132, 0.2)'];

var borderColorArray = ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)','rgba(255,99,132,1)'];

var responseTimeArray = ["Within An Hour", "Within A Few Hours", "Within A Day"];

function loadAll(){
  var bar1 = document.getElementById("myChart1").getContext('2d');
  var bar2 = document.getElementById("myChart2").getContext('2d');
  var scatter1 = document.getElementById("myChart3").getContext('2d');
  Chart.defaults.global.defaultColor = 'rgba(217, 0, 65,1)';
  var scatterChart = new Chart(scatter1, {
    responsive: true,
    maintainAspectRatio: true,
    type: 'scatter',
    data: {
        datasets: [{
            // data: getPointsForHostSince(),
            data: scatter1Data,
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
                  labelString: 'Days as AirBnb Host',
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

  var barChart = new Chart(bar1, {
    type: 'bar',
    data: {
        labels: neighborhoodArray,
        datasets: [{
            // data: getPointsForLocationScore(),
            data: bar1Data,
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

  var barChart = new Chart(bar2, {
    type: 'bar',
    data: {
        labels: responseTimeArray,
        datasets: [{
            // data: getPointsForResponseTimeCorrelation(),
            data: bar2Data,
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



function getPointsForHostSince(){
  var pointArray = [];
  for (low = 0, high = 25; high <3000; low+=25, high+=25){
    var pointsInCohort = [];
    for (let p of data){
      var host_since = p.fields.host_since;
      var score = p.fields.score_overall;
      var daysAsHost = today.diff(host_since, 'days');
      if (daysAsHost<3000 && daysAsHost>=low && daysAsHost<=high){
        pointsInCohort.push({daysAsHost, score});
      }
    }
    pointArray.push(compileHostSincePoints(pointsInCohort));
  }
  console.log(JSON.stringify(pointArray));
  return pointArray;
}

function getPointsForResponseTimeCorrelation(){
  var pointArray = [];
  for (i = 0; i <responseTimeArray.length; i++){
    var pointsInCohort = [];
    for (let p of data){
      var responseTime = p.fields.host_response_time;
      var score = p.fields.score_overall;
      if ((responseTime).toString() == "within an hour") {responseTime = "Within An Hour";}
      if ((responseTime).toString() == "within a few hours") {responseTime = "Within A Few Hours";}
      if ((responseTime).toString() == "within a day") {responseTime = "Within A Day";}
      if (responseTime != 'N/A' &&responseTime == responseTimeArray[i]){
        pointsInCohort.push({responseTime, score});
      }
    }
    if (pointsInCohort.length>0){
      pointArray.push(compileResponseRatePoints(pointsInCohort));
    }

  }
  console.log(JSON.stringify(pointArray));
  return pointArray;
}

function getPointsForLocationScore(){
  var pointArray = [];
  for (i=0; i<neighborhoodArray.length; i++){
    var pointsInCohort = [];
    for (let p of data){
      var neighborhood = p.fields.neighborhood;
      var score = p.fields.score_location;
      if (neighborhood == neighborhoodArray[i]){
        pointsInCohort.push({neighborhood, score});
      }
    }
    pointArray.push(compileLocationPoints(pointsInCohort));
  }
  pointArray.sort(function(a, b) {
    return parseFloat(b.y) - parseFloat(a.y);
  });
  console.log(JSON.stringify(pointArray));
  return pointArray;
}

function compileLocationPoints(points){
  var neighborhoodName = points[0].neighborhood;
  var averageScoreArray = [];
  for (let p of points){
    averageScoreArray.push(p.score);
  }
  var averageScore = averageArray(averageScoreArray).toFixed(2);
  return {x:neighborhoodName,y:averageScore};
}

function compileResponseRatePoints(points){
  var responseTime = points[0].responseTime;
  var averageScoreArray = [];
  for (let p of points){
    averageScoreArray.push(p.score);
  }
  var averageScore = averageArray(averageScoreArray).toFixed(2);
  return {x:responseTime,y:averageScore};
}

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

function averageArray(e){
  total = 0;
  for (let point of e){
    total = total + point;
  }
  return total/e.length;
}
