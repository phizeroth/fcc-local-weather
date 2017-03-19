$(document).ready(function() {
  if ('geolocation' in navigator) {
    $('#test').html('Yep');
  } else {
    $('#test').html('Nope');
  }
});
