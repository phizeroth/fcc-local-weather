var units = ['C', 'F'];
var unitIndex = 1;    //set default to Fahrenheit
var loc = '';

function foo(lat, long) {
  loc = lat + ',' + long;
  loadWeather(loc, units[unitIndex]);
}

function loadWeather(loc, unit) {
    console.log(loc);
    $.simpleWeather({
      unit: unit,
      location: loc,
      success: function(weather) {
        $('#spinner').css('display', 'none');
        $('.content').css('display', 'inherit');
        $('.container').css('display', 'block');
        $('#city').html(weather.city);
        $('#region').html(weather.region + ', ' + weather.country);
        $('#date').html(moment().format('dddd, MMMM D, YYYY'));
        $('.icon').attr('data-icon', 'N');
        $('#temperature').html(weather.temp);
        $('#unit').html('°' + this.unit);
        $('#hi').html('HI ' + weather.high);
        $('#lo').html('LO ' + weather.low);
        $('#weather-title').html(weather.currently);
        $('#icon').addClass('wi-yahoo-' + weather.code)
        console.log(weather.code);
      }
    });
  }

$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(function(position) {
    foo(position.coords.latitude, position.coords.longitude);
  });

  $('#unit').on('click', function() {
    unitIndex ^= 1;   //toggle units
    loadWeather(loc, units[unitIndex]);
  });

});
