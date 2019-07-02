import Layout from './balloonLayout.js';

// Создание метки.
export default async(map, clusterer, coords, address, review, balloonopenFunction) => { // eslint-disable-line
 
    const balloonLayout = Layout(address, review)
    // console.log(compiledLayout)
    var newPlacemark = new ymaps.Placemark(coords, { // eslint-disable-line
        address: address,
        review: review,
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        balloonPanelMaxMapArea: 0,
        balloonOffset: [0,-600],
        // Балун будем открывать и закрывать кликом по иконке метки.
        hideIconOnBalloonOpen: false
    });
    newPlacemark.events.add('click', async () => {
        await map.balloon.open(coords, balloonLayout)
        document.getElementById('balloonAddReviewButton').addEventListener('click', () => {
            balloonopenFunction(map, clusterer, address, coords)
        })
    })
    map.geoObjects.add(newPlacemark)
    clusterer.add(newPlacemark);

    return newPlacemark
}