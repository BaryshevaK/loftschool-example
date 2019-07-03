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
        var clusterer =  await Clusterer(myMap, addReview)
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
    const dateTime = Dater(),
        nameInput = document.getElementById('balloonInputName'),
        placeInput = document.getElementById('balloonInputPlace'),
        commentInput = document.getElementById('balloonInputComment'),
        reviews = document.getElementById('balloonReviews'),
        newReview = { name: nameInput.value, place: placeInput.value, comment: commentInput.value, dateTime: dateTime },
        newReviewText = `${newReview.name} ${newReview.place} ${dateTime}\n${newReview.comment}`,
        storedLocations = JSON.parse(localStorage.getItem('locations', '') || '[]'),
        newLocation = {address: address, coords: coords, review: newReview };

    console.log(reviews.innerText);
    reviews.innerText = (reviews.innerText==='Отзывов пока нет') ? newReviewText : `${reviews.innerText}\n${newReviewText}`;
    storedLocations.push(newLocation);
    localStorage.setItem('locations', JSON.stringify(storedLocations));
    Marker(myMap, clusterer, newLocation, addReview);
    nameInput.value = placeInput.value = commentInput.value = '';
}


