const CSV_PATH = 'assets/data/attractions.json'
const MAX_STREET_VIEW_RADIUS = 50;
let streetPosition;
let userGuessResult;
let map;
let score = 0;

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
    const { spherical } = await google.maps.importLibrary("geometry")

    const position = { lat: 53.4152431, lng: -7.9559668 };
    map = new google.maps.Map(document.getElementById("game-map-container"), {
        center: position,
        zoom: 7,
        streetViewControl: false,
        mapId: "47f8f1437cc57452", // PERSONAL GMAPS ID WITH CUSTOM STYLES
        clickableIcons: false //DISABLES NATIVE CLICKABLE PLACE ICONS
    });

    map.addListener('click', (event) => {
        // console.log(event)
        let userClick = event.latLng
        let lat = userClick.lat();
        let lng = userClick.lng();
        userGuessResult = { lat: lat, lng: lng }
        // console.log(userGuessResult)
        google.maps.event.clearInstanceListeners(map);
        getDistance();

    })
}

// CALC DISTANCE BETWEEN GUESS AND STREET VIEW LOCATIONS
const getDistance = () => {
    const calcDistance = google.maps.geometry.spherical.computeDistanceBetween(userGuessResult, streetPosition)
    console.log(calcDistance)
    // console.log(userGuessResult, streetPosition)
    const lineIcons = [
        {
            fixedRotation: false,
            offset: '0%',
            icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 4,
                fillOpacity: 1,
                fillColor: '#ffffff',
                strokeOpacity: 1,
                strokeColor: '#000000',
                strokeWeight: 1
            },
        },
        {
            fixedRotation: true,
            offset: '100%',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillOpacity: 1,
                fillColor: '#ffffff',
                strokeOpacity: 1,
                strokeColor: '#000000',
                strokeWeight: 1
            },
        }
    ]
    const drawLine = new google.maps.Polyline(
        {
            path: [userGuessResult, streetPosition],
            visible: true,
            map: map,
            strokeWeight: 5,
            strokeColor: "#008080",
            icons: lineIcons
        }
    )

    const calcScore = () => {
        if (calcDistance < 50) {
            score = score += 1000;
            console.log(score)
        }
        else if (calcDistance < 200) {
            score = score += 900;
            console.log(score)
        }
        else if (calcDistance < 500) {
            score = score += 700;
            console.log(score)
        }
        else if (calcDistance < 1000) {
            score = score += 500;
            console.log(score)
        }
        else if (calcDistance < 5000) {
            score = score += 350;
            console.log(score)
        }
        else if (calcDistance < 10000) {
            score = score += 200;
            console.log(score)
        }
        else if (calcDistance < 50000) {
            score = score += 100;
            console.log(score)
        }
        else score = score += 0;

        // ADD SCORE AND LOCATION TO SCOREBOARD
        document.querySelector('.game-scoreboard .game-text-content-header').innerText = `Score: ${score}/5000`;
        document.querySelector('.game-scoreboard .game-text-content-paragraph').innerText = `Place: ${data[streetLocationIndex].Name}, ${data[streetLocationIndex].AddressLocality}, ${data[streetLocationIndex].AddressRegion}`;
        console.log(data[streetLocationIndex]);

        // SHOW SCOREBOARD
        let scoreboard = document.querySelector('.game-scoreboard')
        scoreboard.classList.remove('hidden')
        let btn = document.querySelector('.game-scoreboard .game-play-button')
        // RESTART WHEN BUTTON CLICKED
        btn.addEventListener('click', () => {
            initStreetView();
            scoreboard.classList.add('hidden')
            drawLine.setMap(null);
            initMap();
        })
    }
    calcScore();

}
let streetLocationIndex;
async function initStreetView() {
    const { StreetViewService } = await google.maps.importLibrary("streetView")
    const { StreetViewPanorama } = await google.maps.importLibrary("streetView")
    let data = await fetchData();
    streetLocationIndex = Math.floor(Math.random() * 622);
    // console.log(streetLocationIndex)
    const { Name, Latitude, Longitude } = data[streetLocationIndex];
    // console.log(Name, Latitude, Longitude)

    // DEFINE LATLNG OBJ FOR STREET VIEW POSITION
    streetPosition = { lat: Latitude, lng: Longitude }

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
        // console.log(streetViewStatus) // LOGS STATUS OF REQUEST
        // console.log(streetViewData) // LOGS REQUEST OBJ

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
    })
}

async function main() {
    await fetchData();
    await initMap();
    await initStreetView();
}

main();

// DEFINE PLAY BUTTON
let playBtn = document.querySelector('.game-play-button')
let gameIntroHeader = document.querySelector('.game-text-content-header')
let gameIntroText = document.querySelector('.game-text-content-paragraph')
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

