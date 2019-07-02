// Создание метки.
export default async(map, clusterer, coords, address, review, balloonopenFunction, reopen) => { // eslint-disable-line
    const source = $('#balloon-template').html() // eslint-disable-line
    const template = Handlebars.compile(source) // eslint-disable-line
    const context = { properties: { 'address': address, 'review': review } }
    const compiledLayout = template(context)

    // console.log(compiledLayout)
    var newPlacemark = new ymaps.Placemark(coords, { // eslint-disable-line
        address: address,
        review: review,
        iconContent: '1',
    }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: false,
        balloonPanelMaxMapArea: 0,
        balloonCloseButton: true,
        // Балун будем открывать и закрывать кликом по иконке метки.
        hideIconOnBalloonOpen: false
    });
    newPlacemark.events.add('click', async () => {
        await map.balloon.open(coords, compiledLayout)
        document.getElementById('balloonAddReviewButton').addEventListener('click', () => {
            balloonopenFunction(map, clusterer, context.properties, coords)
        })
    })
    map.geoObjects.add(newPlacemark)
    clusterer.add(newPlacemark);

    return newPlacemark
}