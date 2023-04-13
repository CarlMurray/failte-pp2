const API_URL = 'https://failteireland.azure-api.net/opendata-api/v1/attractions';

// Initialize and add the map, code copied from Maps API documentation
let map;
let data;

async function initMap() {
  // The location of Uluru
  const position = { lat: 53.4152431, lng: -7.9559668 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 7,
    center: position,
  });

}

// function takes lat lng parameters which are defined in positionMarker function, code copied from Maps API documentation and modified
const createMarker = async (lat, lng) => {
    const { Marker } = await google.maps.importLibrary("marker");
    const marker = new Marker({
      map: map,
      position: { lat: lat, lng: lng },
    });
  }

// function to fetch attraction data from Failte Ireland API
async function fetchData() {
    const getData = await fetch(API_URL);
    const responseData = await getData.json();
    data = responseData.results;
    console.log(data);
    return data;
}

// Function loops through all data points and get lat lng arguments for createMarker function
const positionMarker = async () => {
    // await fetchData(); // ********* FOR TESTING PURPOSES **********
    for (i = 0; i < data.length; i++){

        //destructure each array obj to define lat lng arguments
        const {latitude: lat, longitude: lng} = data[i].geo;
        console.log(lat, lng);

        //call function to plot markers on map
        createMarker(lat, lng);
    }
}

// main function to run app
const main = async () => {
    initMap();
    await fetchData();
    positionMarker();
}

main();