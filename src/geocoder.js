export default (coord) => {
    var apikey = '35cfb11b-564a-46b4-b6e1-9669c9b744e4'

    return fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&format=json&geocode=${coord[1]},${coord[0]}`)
        .then(r => r.json())
        .then(r => r.response)
        .then(r => r.GeoObjectCollection.featureMember[0].GeoObject)
        .then(r => {
            var location = {
                coords: { 
                    lat: r.Point.pos.split(' ')[0],
                    lon: r.Point.pos.split(' ')[1]
                }, 
                address: `${r.description}: ${r.name}`,
                review: {}
            }


            return location;
        })
}