const CSV_PATH = 'assets/data/attractions.json'

async function initMap() {
    // SET INIT POSITION AT IRELAND
    const position = { lat: 53.4152431, lng: -7.9559668 };
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("game-map-container"), {
        mapId: "47f8f1437cc57452", // PERSONAL GMAPS ID WITH CUSTOM STYLES
        zoom: 7,
        center: position,
    });

}

// FETCH ATTRACTION DATA FROM FAILTE IRELAND CSV attractions.json
async function fetchData() {
    const getData = await fetch(CSV_PATH);
    data = await getData.json();
    console.log(data);
    return data;
}

function initialize() {
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
          position: { lat: 37.86926, lng: -122.254811 },
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
        }
      );
}

window.initialize = initialize;