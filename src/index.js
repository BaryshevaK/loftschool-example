import Marker from './marker.js';
import GeoCoder from './geocoder.js';
import Clusterer from './clusterer.js'
import FillPlacemarksFromStorage from './filler.js';
import Layout from './balloonLayout.js';
import Dater from './dater.js'


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
            const address = (await GeoCoder(coords)).address;
            const balloonLayout = Layout(address)
            await myMap.balloon.open(coords, balloonLayout)
            document.getElementById("balloonAddReviewButton").addEventListener("click", () => {
                addReview(myMap, clusterer, address, coords)
            });
        });
    });
    
}

main()


function addReview (myMap, clusterer, address, coords) {
    const dateTime = Dater();
    const nameInput = document.getElementById('balloonInputName');
    const placeInput = document.getElementById('balloonInputPlace');
    const commentInput = document.getElementById('balloonInputComment');
    const reviews = document.getElementById('balloonReviews');
    const newReview = { name: nameInput.value, place: placeInput.value, comment: commentInput.value, dateTime: dateTime };
    const newReviewText = `${newReview.name} ${newReview.place} ${dateTime}\n${newReview.comment}`;
    const storedLocations = JSON.parse(localStorage.getItem('locations', '') || '[]');
    console.log(reviews.innerText);
    reviews.innerText = (reviews.innerText==='Отзывов пока нет') ? newReviewText : `${reviews.innerText}\n${newReviewText}`;
    storedLocations.push({address: address, coords: coords, review: newReview });
    localStorage.setItem('locations', JSON.stringify(storedLocations));
    Marker(myMap, clusterer, coords, address, newReview, addReview);
    nameInput.value = placeInput.value = commentInput.value = '';
}