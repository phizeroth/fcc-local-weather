var units = ['C', 'F'];
var unitIndex = 1;    //set default to Fahrenheit
var loc = '';
var temperature = {};

function initWeather(lat, long) {
  loc = lat + ',' + long;
  loadWeather(loc, units[unitIndex]);
}

function loadWeather(loc) {
    console.log(loc);
    $.simpleWeather({
      location: loc,
      unit: 'C',  // The API has a bug with alt.units for F, hence initializing with C
      success: function(weather) {
        $('#spinner').css('display', 'none');
        $('.content').css('display', 'flex');
        $('.container').css('display', 'inline');
        $('#city').html(weather.city);
        $('#region').html(weather.region + ', ' + weather.country);
        $('#date').html(moment().format('dddd, MMMM D, YYYY'));
        $('.icon').attr('data-icon', 'N');
        $('#weather-title').html(weather.currently);
        $('#icon').addClass('wi-yahoo-' + weather.code)
        console.log(weather.code);
        temperature = {
          C: {
            temp: weather.temp,
            hi: weather.high,
            lo: weather.low
          },
          F: {
            temp: weather.alt.temp,
            hi: weather.alt.high,
            lo: weather.alt.low
          }
        };
        updateTemps('F', temperature);
      }
    });
  }

  function updateTemps(unit, temps) {
    let t = temps[unit];
    console.log(temps);
    $('#temperature').html(t.temp);
    $('#unit').html('°' + unit);
    $('#hi').html(t.hi);
    $('#lo').html(t.lo);
  }

$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(function(position) {
    initWeather(position.coords.latitude, position.coords.longitude);
  });

  $('#unit').on('click', function() {
    unitIndex ^= 1;   //toggle units
    updateTemps(units[unitIndex], temperature);
  });

});
