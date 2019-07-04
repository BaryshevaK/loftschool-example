import Layout from './balloonLayout.js'

export default async (myMap, addReview) => {
    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div id="clustererItemPlace">{{ properties.review.place }}</div> ' +
        '<div><a id="clustererItemAddressLink" href="javascript:void(0)">{{ properties.address }}</a> </div> ' +
        '<div id="clustererItemComment">{{ properties.review.comment }}</div> ' +
        '<div id="clustererItemDateTime">{{ properties.review.dateTime }}</div> '
    );

    console.log(customItemContentLayout)

    var clusterer = new ymaps.Clusterer({ // eslint-disable-line
        preset: 'islands#invertedVioletClusterIcons',
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        // Устанавливаем стандартный макет балуна кластера "Карусель".
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        // Устанавливаем собственный макет.
        clusterBalloonItemContentLayout: customItemContentLayout,
        // Устанавливаем режим открытия балуна. 
        // В данном примере балун никогда не будет открываться в режиме панели.
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        // Устанавливаем максимальное количество элементов в нижней панели на одной странице
        clusterBalloonPagerSize: 5
        // Настройка внешнего вида нижней панели.
        // Режим marker рекомендуется использовать с небольшим количеством элементов.
        // clusterBalloonPagerType: 'marker',
        // Можно отключить зацикливание списка при навигации при помощи боковых стрелок.
        // clusterBalloonCycling: false,
        // Можно отключить отображение меню навигации.
        // clusterBalloonPagerVisible: false
    });

    clusterer.events.add('balloonopen', async () => {
        
        const place = document.getElementById('clustererItemPlace'),
            link = document.getElementById('clustererItemAddressLink'),
            comment = document.getElementById('clustererItemComment'),
            dateTime = document.getElementById('clustererItemDateTime')

        link.addEventListener('click', async () => {
            console.log('Hello there, general Kenobi')
            await clusterer.balloon.close();
            openBalloon(myMap, clusterer, place.innerText, link.innerText, comment.innerText, dateTime.innerText, addReview)
        })
    })
    myMap.geoObjects.add(clusterer);

    return clusterer

}

async function openBalloon(myMap, clusterer, place, address, comment, dateTime, addReview) {
    const storedLocations = JSON.parse(localStorage.getItem('locations', '') || '[]');
    const foundLocations = storedLocations.filter( n => n.review.place===place && n.address===address && n.review.comment===comment && n.review.dateTime===dateTime );
    console.log(foundLocations);
    const balloonLayout = Layout(address, foundLocations[0].review)
    await myMap.balloon.open(foundLocations[0].coords, balloonLayout)
    document.getElementById("balloonAddReviewButton").addEventListener("click", () => {
        addReview(myMap, clusterer, foundLocations[0].address, foundLocations[0].coords)
    });
    const sameLocations = storedLocations.filter(n=>  n.address===address && !( n.review.place===place && n.review.comment===comment && n.review.dateTime===dateTime))
    console.log(sameLocations)
    const reviews = document.getElementById('balloonReviews')
    sameLocations.forEach(sameLocation => {
        var newReviewText = `${sameLocation.review.name} ${sameLocation.review.place} ${sameLocation.review.dateTime}\n${sameLocation.review.comment}`;
        reviews.innerText +=`\n${newReviewText}`;
    });
}