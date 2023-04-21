const CSV_PATH = 'assets/data/attractions.json'
const MAX_STREET_VIEW_RADIUS = 50;

// FETCH ATTRACTION DATA FROM FAILTE IRELAND CSV attractions.json
async function fetchData() {
    const getData = await fetch(CSV_PATH);
    data = await getData.json();
    // console.log(data);
    return data;
}

// CODE FROM GOOGLE MAPS API DOCUMENTATION
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps")

    const position = { lat: 53.4152431, lng: -7.9559668 };
    const map = new google.maps.Map(document.getElementById("game-map-container"), {
        center: position,
        zoom: 7,
        streetViewControl: false,
        mapId: "47f8f1437cc57452", // PERSONAL GMAPS ID WITH CUSTOM STYLES
        clickableIcons: false //DISABLES NATIVE CLICKABLE PLACE ICONS
    });
}

async function initStreetView() {
    const { StreetViewService } = await google.maps.importLibrary("streetView")
    const {StreetViewPanorama} = await google.maps.importLibrary("streetView")
    let data = await fetchData();
    let streetLocationIndex = Math.floor(Math.random() * 622);
    console.log(streetLocationIndex)
    const { Name, Latitude, Longitude } = data[streetLocationIndex];
    console.log(Name, Latitude, Longitude)

    // DEFINE LATLNG OBJ FOR STREET VIEW POSITION
    let streetPosition = { lat: Latitude, lng: Longitude }

    // console.log(data);

    // CREATE NEW STREET MAPS SERVICE
    let streetViewService = new google.maps.StreetViewService();

    // DEFINE REQUEST TO BE PASSED TO getPanorama()
    let streetViewRequest = {
        location: streetPosition,
        radius: MAX_STREET_VIEW_RADIUS
    }
    // CREATE NEW PANO WITH CONTAINER
    let newStreetViewPano = new StreetViewPanorama(document.querySelector('#game-street-container'), 
    {
        addressControl: false, // REMOVES OVERLAY SHOWING STREET VIEW LOCATION
        showRoadLabels: false, // HIDES ROAD LABELS
        disableDefaultUI: true, // TURNS OFF STREET VIEW UI
        clickToGo: false, // DISABLES ABILITY TO MOVE
        fullscreenControl: true,
        fullscreenControlOptions: true
    });

    
    let streetViewObject = streetViewService.getPanorama(streetViewRequest, (streetViewData, streetViewStatus) => {
        console.log(streetViewStatus) // LOGS STATUS OF REQUEST
        console.log(streetViewData) // LOGS REQUEST OBJ
        
        // CHECK THAT STREET VIEW IS VALID AND SET VISIBLE
        if (streetViewStatus === "OK") {
        newStreetViewPano.setPano(streetViewData.location.pano)
        newStreetViewPano.setVisible(true)
        }

        // IF NOT, TRY AGAIN
        else {
            console.log(streetViewStatus)
            initStreetView();
        };
})}
    
async function main() {
    await fetchData();
    await initMap();
    await initStreetView();
}

main();

// DEFINE PLAY BUTTON
let playBtn = document.querySelector('#game-play-button')
let gameIntroHeader = document.querySelector('#game-text-content-header')
let gameIntroText = document.querySelector('#game-text-content-paragraph')
let gameIntroOverlay = document.querySelector('.game-container-overlay')

let isClicked = false;

// LISTEN FOR PLAY BUTTON CLICK
playBtn.addEventListener('click', () => {
    isClicked = !isClicked;
    if (isClicked) {
        gameIntroHeader.innerText = 'How to play'
        gameIntroText.innerText = 'You are dropped at a random attraction on the island of Ireland. Guess the location by clicking the map - the closer you are, the more points you get!'
        playBtn.innerText = 'Play'
    }
    else {
        gameIntroHeader.classList.add('hidden')
        gameIntroText.classList.add('hidden')
        playBtn.classList.add('hidden')
        gameIntroOverlay.classList.add('hidden')
    }
})