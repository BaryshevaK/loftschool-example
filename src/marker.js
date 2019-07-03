import Layout from './balloonLayout.js';

// Создание метки.
export default async(map, clusterer, location, balloonopenFunction) => { // eslint-disable-line
 
    const balloonLayout = Layout(location.address, location.review)
    // console.log(compiledLayout)
    var newPlacemark = new ymaps.Placemark(location.coords, { // eslint-disable-line
        address: location.address,
        review: location.review,
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        balloonPanelMaxMapArea: 0,
        balloonOffset: [0,-600],
        // Балун будем открывать и закрывать кликом по иконке метки.
        hideIconOnBalloonOpen: false
    });
    newPlacemark.events.add('click', async () => {
        await map.balloon.open(location.coords, balloonLayout)
        
        document.getElementById('balloonReviews').innerHTML = fillReviews(location.coords)
        document.getElementById('balloonAddReviewButton').addEventListener('click', () => {
            balloonopenFunction(map, clusterer, location.address, location.coords)
        })
    })
    map.geoObjects.add(newPlacemark)
    clusterer.add(newPlacemark);
    return newPlacemark
}


function fillReviews(coords) {
    const storedLocations = JSON.parse(localStorage.getItem('locations', '') || '[]');
    const foundLocations = storedLocations.filter( n => n.coords[0]===coords[0] && n.coords[1]===coords[1] );
    var resultstring = '';
    foundLocations.forEach(function(n) {
        resultstring+=`
        ${n.review.name} ${n.review.place} ${n.review.dateTime} <br>
        ${n.review.comment}

    `
    });
}