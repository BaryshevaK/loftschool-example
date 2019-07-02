import Marker from './marker.js';

export default async(map, clusterer, balloonopenFunction) => { // eslint-disable-line
    var storedLocations = JSON.parse(localStorage.getItem('locations', '') || '[]')
    var placemarks = [];

    console.log(storedLocations)
    storedLocations.forEach(location => {
        var newPlacemark = Marker(map, clusterer, location.coords, location.address, location.review, balloonopenFunction);

        placemarks.push(newPlacemark)

    });

    console.log(placemarks)  // eslint-disable-line
}