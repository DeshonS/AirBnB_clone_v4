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
});