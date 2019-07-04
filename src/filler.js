import Marker from './marker.js';

export default async(map, clusterer, balloonopenFunction) => { // eslint-disable-line
    var storedLocations = JSON.parse(localStorage.getItem('locations', '') || '[]')
    var placemarks = [];

    console.log('Stored locations:',storedLocations)
    storedLocations.forEach(location => {
        var newPlacemark = Marker(map, clusterer, location, balloonopenFunction);

        placemarks.push(newPlacemark)

    });

    // console.log(placemarks)  // eslint-disable-line
    // console.log(map.geoObjects) 
    // map.geoObjects.each( object=> console.log(object) )

}