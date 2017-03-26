$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude, position.coords.longitude);
  });

  function loadWeather(lat, long) {
    console.log(lat);
    console.log(long);
    $.simpleWeather({
      unit: 'F',
      location: lat + ',' + long,
      success: function(weather) {
        $('#spinner').css('display', 'none');
        $('.content').css('display', 'inherit');
        $('.container').css('display', 'block');
        $('#city').html(weather.city);
        $('#region').html(weather.region + ', ' + weather.country);
        $('#date').html(moment().format('MMMM D, YYYY'));
        $('.icon').attr('data-icon', 'N');
        $('#temperature').html(weather.temp);
        $('#unit').html('°' + this.unit);
        $('#hi').html('HI ' + weather.high);
        $('#lo').html('LO ' + weather.low);
        $('#weather-title').html(weather.currently);
      }
    });
  }
});
