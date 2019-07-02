import Marker from './marker.js';
import GeoCoder from './geocoder.js';
import Clusterer from './clusterer.js'
import FillPlacemarksFromStorage from './filler.js';

var storedLocations = JSON.parse(localStorage.getItem('locations', '') || '[]')


async function main () { // eslint-disable-line
    ymaps.ready(async function () {  // eslint-disable-line
        var myPlacemark,  // eslint-disable-line
            myMap = new ymaps.Map('map', {  // eslint-disable-line
                center: [55.650625, 37.62708],
                zoom: 9
            }, {
                searchControlProvider: 'yandex#search'
            });
        var clusterer = Clusterer()
        myMap.geoObjects.add(clusterer);
        FillPlacemarksFromStorage(myMap, clusterer, addReview)
        // Слушаем клик на карте.
        myMap.events.add('click', async function (e) {
            const coords = e.get('coords');
            const location = await GeoCoder(coords) || 'undefined'
            
            console.log(storedLocations)  // eslint-disable-line
            const address = location.address;
            const source = $('#balloon-template').html() // eslint-disable-line
            const template = Handlebars.compile(source) // eslint-disable-line
            const context = { properties: {'address': address }}
            const precompiledHtml = template(context)
            await myMap.balloon.open(coords, precompiledHtml)
            document.getElementById("balloonAddReviewButton").addEventListener("click", () => {
                addReview(myMap, clusterer, location, coords)
            });
        });
    });
    
}

main()


function addReview (myMap, clusterer, location, coords) {
    const name = document.getElementById('balloonInputName').value
    const place = document.getElementById('balloonInputPlace').value
    const comment = document.getElementById('balloonInputComment').value
    const reviews = document.getElementById('balloonReviews')
    const newReview = `\n${name}, ${place}: ${comment}`
    const storedLocations = JSON.parse(localStorage.getItem('locations', '') || '[]')

    console.log(reviews.innerText)
    reviews.innerText = (reviews.innerText==='Отзывов пока нет') ? newReview : reviews.innerText + newReview;
    const review = { name: name, place: place, comment: comment };

    location.review = review
    storedLocations.push(location)
    localStorage.setItem('locations', JSON.stringify(storedLocations));
    Marker(myMap, clusterer, coords, location.address, location.review, addReview, true);

}
