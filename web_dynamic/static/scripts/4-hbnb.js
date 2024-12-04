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

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, stat) {
    const statusCheck = data['status'];
    if (statusCheck === 'OK') {
        $('div#api_status').addClass('available');
    } else {
        $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (response) {
        for (const place of response) {
            const article = '
                <article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">#{place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>';
            $('section.places').append(article);
        }
    },
    error: function (error) {
        console.error('Error fetching places:', error);
    }
  })
});
