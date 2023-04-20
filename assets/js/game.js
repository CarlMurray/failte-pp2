const CSV_PATH = 'assets/data/attractions.json'
let data;
let panorama;
let streetViewStatus;

// FETCH ATTRACTION DATA FROM FAILTE IRELAND CSV attractions.json
async function fetchData(callback) {
    const getData = await fetch(CSV_PATH);
    data = await getData.json();
    // console.log(data);
    callback();
    return data;
}

// CODE FROM GOOGLE MAPS API DOCUMENTATION
async function initialize(streetPosition) {
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
    )
}

async function locationArray() {
    // console.log(data);

    // PICKS RANDOM NUMBER FROM DATASET TO USE AS INDEX FOR LOCATIONS ARRAY 
    let streetLocationIndex = Math.floor(Math.random()*622);
    console.log(streetLocationIndex)
    const {Name, Latitude, Longitude} = data[streetLocationIndex];
    console.log(Name, Latitude, Longitude)

    // DEFINE LATLNG OBJ FOR STREET VIEW POSITION
    let streetPosition = {lat: Latitude, lng: Longitude}
    await initialize(streetPosition, checkStreetViewStatus);
    // console.log(streetPosition)
    return streetPosition
}

const checkStreetViewStatus = async () => {
    const {StreetViewStatus} = await google.maps.importLibrary("streetView")
    panorama.getStatus((status) => {
        console.log(status)
        if (status === 'OK') {
            console.log('STATUS IS OK')
        }
        else if (status === 'ZERO_RESULTS') [
            console.log('NOT OK')
        ]
    })
}

window.initialize = initialize;
fetchData(locationArray);