export default () => {
    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div> {{ properties.review.place }} <div> ' +
        '<div><a id="addressLink" href="javascript:void(0)"> {{ properties.address }} </a> <div> ' +
        '<div> {{ properties.review.comment }} <div> ' +
        '<div> {{ properties.review.dateTime }} <div> '
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
        
        const link = document.getElementById('addressLink').textContent
        
        link.addEventListener('click', () => {
            console.log('goToPlacemarkBalloon(map, clusterer, address, coords)')
        })
    })

    return clusterer

}