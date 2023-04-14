const API_URL = 'https://failteireland.azure-api.net/opendata-api/v1/attractions';
const CSV_PATH = 'assets/data/attractions.json'

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
// const createMarker = async (lat, lng) => {
//     const { Marker } = await google.maps.importLibrary("marker");
//     const marker = new Marker({
//       map: map,
//       position: { lat: lat, lng: lng },
//     });
//   }

//   COMMENTED OUT, FETCHING CSV AS API IS PAGINATED, NEW FUNCTION BELOW
// function to fetch attraction data from Failte Ireland API
// async function fetchData() {
//     const getData = await fetch(API_URL);
//     const responseData = await getData.json();
//     data = responseData.results;
//     console.log(data);
//     return data;
// }

// function to fetch attraction data from Failte Ireland *** CSV ***
async function fetchData() {
    const getData = await fetch(CSV_PATH);
    data = await getData.json();
    // data = responseData.results;
    console.log(data);
    return data;
}

// Function loops through all data points and get lat lng arguments for createMarker function
const positionMarker = async () => {
    // await fetchData(); // ********* FOR TESTING PURPOSES **********
    
    // define markerArray to use for marker clusterer
    const markerArray = [];
    const markers = [];

    for (let i = 0; i < data.length; i++){
        //destructure each array obj to define lat lng arguments
        const { Latitude: lat, 
                Longitude: lng, 
                Name,
                AddressLocality,
                AddressRegion
              } = data[i];
        // console.log(lat, lng);
        const markerAddress = `${AddressLocality}, ${AddressRegion}`

        // create marker position object for array
        const markerPos = {lat, lng}
        // console.log(markerAddress)

        // add current iteration of markerPos to array
        markerArray.push(markerPos)
        //call function to plot markers on map
        const { Marker } = await google.maps.importLibrary("marker");
        const marker = new Marker({
        map: map,
        position: { lat: lat, lng: lng },
        title: Name
        }
        )
        markers.push(marker)

    // console.log(markers)
    }
  const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });

}

// main function to run app
const main = async () => {
    initMap();
    await fetchData();
    positionMarker();
}

main();

// const testFunction = async () => {
//     const fetchJson = await fetch('/assets/js/csvjson.json')
//     const responseJson = await fetchJson.json();
//     console.log(responseJson);

// }

// testFunction()


//TODO
// add site elements and styling
// add marker popups with info 
// add search
// add filters
// add marker clusters