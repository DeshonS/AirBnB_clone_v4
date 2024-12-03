$(document).ready(function () {
  const amenities = {};

  $('.amenities ul li input[type="checkbox"]').change(function () {
    const amenityId = $(this).parent().data('id');
    const amenityName = $(this).parent().data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }
    const amenList = Object.values(amenities).join(', ');
    $('.amenities h4').text(amenList || '\xa0');
  });

  .get('http://0.0.0.0:5001/api/v1/status/', function (data, stat) {
    const statusCheck = data['status'];
    if (check === 'OK') {
        $('div#api_status').addClass('available');
    } else {
        $('div#api_status').removeClass('available');
    }
  });
});
