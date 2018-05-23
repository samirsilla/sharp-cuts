// Google Maps API

function initMap() {
    var myLatLng = { lat: 42.3468, lng: -71.0998 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng,
        mapTypeId: 'roadmap'
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        label: 'Sharp Barber Spa'
    });
}