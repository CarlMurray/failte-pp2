const CSV_PATH = 'assets/data/attractions.json'
let data;
let panorama;

// async function initMap() {
//     // SET INIT POSITION AT IRELAND
//     const position = { lat: 53.4152431, lng: -7.9559668 };
//     const { Map } = await google.maps.importLibrary("maps");
//     map = new Map(document.getElementById("game-map-container"), {
//         mapId: "47f8f1437cc57452", // PERSONAL GMAPS ID WITH CUSTOM STYLES
//         zoom: 7,
//         center: position,
//     });

// }

// FETCH ATTRACTION DATA FROM FAILTE IRELAND CSV attractions.json
async function fetchData(callback) {
    const getData = await fetch(CSV_PATH);
    data = await getData.json();
    // console.log(data);
    callback();
    return data;
}

// CODE FROM GOOGLE MAPS API DOCUMENTATION
function initialize(streetPosition) {
    const position = { lat: 53.4152431, lng: -7.9559668 };
    const map = new google.maps.Map(document.getElementById("game-map-container"), {
        center: position,
        zoom: 7,
        streetViewControl: false,
        mapId: "47f8f1437cc57452", // PERSONAL GMAPS ID WITH CUSTOM STYLES
    });
    
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("game-street-container"),
        {
          position: streetPosition,
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
        }
    );    
    console.log(streetPosition)

}

async function locationArray() {
    // console.log(data);
    const {Latitude, Longitude} = data[7];
    console.log(Latitude, Longitude)
    let streetPosition = {lat: Latitude, lng: Longitude}
    initialize(streetPosition);
    // console.log(streetPosition)
    return streetPosition
}

// window.initialize = initialize;
fetchData(locationArray);
