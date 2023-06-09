// ADD GOOGLE MAPS JAVASCRIPT API - FROM GOOGLE MAPS JAVASCRIPT API DOCUMENTATION
((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyCbslAH8fUvbb6O544Xyq0iJBzK50vvX08",
  // Add other bootstrap parameters as needed, using camel case.
  // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
});

// PATH FOR GEO LOCATIONS GAME DATA
const JSON_PATH = "assets/data/geo-guess-locations.json";

let streetPosition; //FOR STREET VIEW LATLNG
let userGuessResult;
let map; //GMAPS OBJECT
let score = 0; //INIT SCORE TO 0
let roundNumber = 0; //INIT ROUND TO 0
let data; //FOR GAME LOCATION DATA
let panorama; //GMAPS PANORAMA OBJECT
let streetLocationIndex; //INDEX OF LOCATIONS ARRAY
let accessibleGuessBtnDiv; //CONTAINER FOR ACC BTN CTRL
const crosshairHorizontal = document.createElement("hr"); //ACCESSIBLE CONTROLS CROSSHAIR
const crosshairVertical = document.createElement("hr"); //ACCESSIBLE CONTROLS CROSSHAIR
let controlButton;

// FETCH ATTRACTION DATA FROM geo-guess-locations.json
async function fetchData() {
  const getData = await fetch(JSON_PATH);
  data = await getData.json();
  return data;
}

// INITIALISE GOOGLE MAP OBJECT
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps"); //MAPS LIBRARY
  const { spherical } = await google.maps.importLibrary("geometry"); //REQUIRED TO MEASURE DISTANCE BETWEEN POINTS

  const position = { lat: 53.4152431, lng: -7.9559668 }; //POSITION MAP AT IRELAND
  map = new google.maps.Map(document.getElementById("game-map-container"), {
    center: position,
    zoom: 7,
    streetViewControl: false, // DISABLE STREET VIEW CONTROLS
    mapId: "47f8f1437cc57452", // PERSONAL GMAPS ID WITH CUSTOM STYLES
    clickableIcons: false, //DISABLES NATIVE CLICKABLE PLACE ICONS
  });

  // CREATE ACCESSIBLE CONTROL CONTAINER/BTN
  const accessibleControlDiv = document.createElement("div");
  accessibleGuessBtnDiv = document.createElement("div");

  // CHECK IF ACCESSIBLE CTRLS ENABLED
  if (accessibleIsClicked === false) {
    accessibleGuessBtnDiv.classList.add("hidden"); // ADD HIDDEN CLASS TO GUESS BTN
    crosshairHorizontal.classList.add("hidden"); // ADD HIDDEN CLASS TO CROSSHAIRS
    crosshairVertical.classList.add("hidden"); // ADD HIDDEN CLASS TO CROSSHAIRS
  }

  // CREATE ACCESSIBLE CONTROL
  const accessibleControl = createAccessibleControl(map); //CALL FN TO CREATE CTRL TOGGLE
  const accessibleGuessBtn = createAccessibleGuessBtn(map); //CALL FN TO CREATE BTN

  // APPEND ACCESSIBLE CONTROL TOGGLE TO MAP
  accessibleControlDiv.appendChild(accessibleControl);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(accessibleControlDiv);

  // APPEND ACCESSIBLE GUESS CONTROL BTN TO MAP
  accessibleGuessBtnDiv.appendChild(accessibleGuessBtn);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
    accessibleGuessBtnDiv
  );

  // ADD LISTENER TO MAP TO DETECT USER GUESS
  map.addListener("click", registerGuess);
}

// CALC DISTANCE BETWEEN GUESS AND STREET VIEW LOCATIONS
const getDistance = async () => {
  // CALCULATE DISTANCE BETWEEN GUESS AND ANSWER
  const calcDistance = google.maps.geometry.spherical.computeDistanceBetween(
    userGuessResult,
    streetPosition
  );

  // DEFINE ICONS TO SHOW ON DISTANCE LINE
  const lineIcons = [
    {
      fixedRotation: false,
      offset: "0%",
      icon: {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 4,
        fillOpacity: 1,
        fillColor: "#ffffff",
        strokeOpacity: 1,
        strokeColor: "#000000",
        strokeWeight: 1,
      },
    },
    {
      fixedRotation: true,
      offset: "100%",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillOpacity: 1,
        fillColor: "#ffffff",
        strokeOpacity: 1,
        strokeColor: "#000000",
        strokeWeight: 1,
      },
    },
  ];

  // DRAW LINE ON MAP
  const drawLine = new google.maps.Polyline({
    path: [userGuessResult, streetPosition],
    visible: true,
    map: map,
    strokeWeight: 5,
    strokeColor: "#008080",
    icons: lineIcons,
  });

  // CALC SCORE BASED ON DISTANCE IN METRES
  const calcScore = async () => {
    if (calcDistance < 200) {
      score = score += 1000;
    } else if (calcDistance < 1000) {
      score = score += 900;
    } else if (calcDistance < 5000) {
      score = score += 700;
    } else if (calcDistance < 10000) {
      score = score += 500;
    } else if (calcDistance < 25000) {
      score = score += 350;
    } else if (calcDistance < 50000) {
      score = score += 200;
    } else if (calcDistance < 100000) {
      score = score += 100;
    } else score = score += 0;

    // ADD SCORE AND LOCATION TO SCOREBOARD
    document.querySelector(
      ".game-scoreboard .game-text-content-header"
    ).innerText = `Score: ${score}/5000`;
    document.querySelector(
      ".game-scoreboard .game-text-content-paragraph"
    ).innerHTML = `Place: ${
      data[streetLocationIndex].Name
    } <br> Your guess was within ${(calcDistance / 1000).toFixed(1)}km`;
    document.querySelector(
      ".game-round-number"
    ).innerText = `Round ${roundNumber} of 5`;

    // REMOVE CURRENT LOCATION FROM LOCATIONS ARRAY SO NOT REPEATED
    data.splice(streetLocationIndex, 1);

    // RESTART LOCATIONS LIST IF ALL EXHAUSTED
    if (data.length === 0) {
      data = await fetchData();
    }

    // SHOW SCOREBOARD
    let scoreboard = document.querySelector(".game-scoreboard");
    scoreboard.classList.remove("hidden");
    let btn = document.querySelector(".game-scoreboard .game-play-button");
    panorama.setVisible(false); //HIDE STRTVW SO NOT KEYBD SELECTABLE
    await changeStreetView();

    // START NEXT ROUND ON BUTTON CLICK
    btn.addEventListener("click", () => {
      scoreboard.classList.add("hidden"); //HIDE SCOREBOARD
      drawLine.setMap(null); //HIDE LINE
      initMap(); //REFRESH MAP
      panorama.setVisible(true); //SHOW STRTVW ON PLAY
    });

    // SHOW END GAME SCREEN AFTER ROUNDS
    if (roundNumber === 5) {
      document.querySelector(
        ".game-scoreboard .game-text-content-header"
      ).innerText = `Final Score: ${score}/5000`;
      document.querySelector(
        ".game-scoreboard .game-text-content-header"
      ).style.color = "#fff";
      document.querySelector(".game-round-number").style.color = "#fff";
      document.querySelector(
        ".game-scoreboard .game-text-content-paragraph"
      ).style.color = "#fff";
      btn.innerText = "Play again";
      btn.classList.remove("game-play-button");
      btn.classList.add("game-play-again-button");
      scoreboard.style.backgroundColor = "#008080";

      // RESET ROUND AND SCORE FOR NEW GAME
      roundNumber = 0;
      score = 0;

      // REVERT SCOREBOARD TO NORMAL STYLES IF PLAY AGAIN
      btn.addEventListener("click", () => {
        scoreboard.style.backgroundColor = "#fff";
        document.querySelector(
          ".game-scoreboard .game-text-content-header"
        ).style.color = "#008080";
        document.querySelector(".game-round-number").style.color = "#008080";
        document.querySelector(
          ".game-scoreboard .game-text-content-paragraph"
        ).style.color = "#000";
        btn.innerText = "Next round";
        btn.classList.add("game-play-button");
        btn.classList.remove("game-play-again-button");
      });
    }
  };
  calcScore();
};

// FUNCTION TO CHANGE STREET VIEW PANO
const changeStreetView = async () => {
  // PICK RANDOM INDEX OF LOCATIONS DATA ARRAY
  streetLocationIndex = Math.floor(Math.random() * data.length);
  const { Name, Latitude, Longitude } = data[streetLocationIndex];

  // DEFINE LATLNG OBJ FOR STREET VIEW POSITION
  streetPosition = { lat: Latitude, lng: Longitude };

  // SET NEW STREET VIEW
  panorama.setPosition(streetPosition);
};

// INITIALISE STREET VIEW OBJECT
async function initStreetView() {
  const { StreetViewPanorama } = await google.maps.importLibrary("streetView");
  panorama = new StreetViewPanorama(
    document.querySelector("#game-street-container"),
    {
      addressControl: false, // REMOVES OVERLAY SHOWING STREET VIEW LOCATION
      showRoadLabels: false, // HIDES ROAD LABELS
      disableDefaultUI: true, // TURNS OFF STREET VIEW UI
      clickToGo: false, // DISABLES ABILITY TO MOVE
      fullscreenControl: true,
      fullscreenControlOptions: true,
    }
  );
}

// DEFINE INTRO ELEMENTS
let playBtn = document.querySelector(".game-play-button");
let gameIntroHeader = document.querySelector(".game-text-content-header");
let gameIntroText = document.querySelector(".game-text-content-paragraph");
let gameIntroOverlay = document.querySelector(".game-container-overlay");

let isClicked = false; //STATE OF PLAY BUTTON

// LISTEN FOR PLAY BUTTON CLICK
playBtn.addEventListener("click", () => {
  isClicked = !isClicked;

  // SHOW GAME INSTRUCTIONS ON CLICK
  if (isClicked) {
    gameIntroHeader.innerText = "How to play";
    gameIntroText.innerHTML =
      "You are dropped at a random attraction on the island of Ireland. Guess the location by clicking the map - the closer you are, the more points you get! <br><br><strong>Check the top-left corner of the Map for keyboard controls!</strong><br>";
    playBtn.innerText = "Play";
  }

  // HIDE INSTRUCTIONS AND START GAME ON SECOND CLICK
  else {
    gameIntroHeader.classList.add("hidden");
    gameIntroText.classList.add("hidden");
    playBtn.classList.add("hidden");
    gameIntroOverlay.classList.add("hidden");

    // SHOW GAME ON PLAY
    document.querySelector("#game-container").classList.remove("hidden");
  }
});

let accessibleIsClicked = false; //STATE OF ACC. CTRL BTN

// CREATES ACCESSBILITY CONTROL
function createAccessibleControl(map) {
  const controlButton = document.createElement("button");
  controlButton.setAttribute("id", "accessible-control-toggle");
  controlButton.setAttribute(
    "aria-label",
    "click to enable keyboard game controls"
  );
  controlButton.title = "click to enable keyboard game controls";
  controlButton.type = "button";

  // CREATE MAP CROSSHAIR
  const mapContainer = document.querySelector("#game-map-container"); // STORE MAP DIV IN VARIABLE
  mapContainer.appendChild(crosshairHorizontal);
  mapContainer.appendChild(crosshairVertical);

  // ADD CROSSHAIR STYLES
  crosshairHorizontal.classList.add("map-crosshair");
  crosshairVertical.classList.add("map-crosshair");
  crosshairVertical.style.transform = "rotate(90deg)"; //ROTATE FOR VERTICAL CROSSHAIR

  // SHOW KEYBOARD CTRLS ON CLICK
  controlButton.addEventListener("click", () => {
    accessibleIsClicked = !accessibleIsClicked;
    controlButton.classList.toggle("accessible-control-toggle-on");
    accessibleGuessBtnDiv.classList.toggle("hidden");
    crosshairHorizontal.classList.toggle("hidden");
    crosshairVertical.classList.toggle("hidden");
    document.querySelector('[aria-label="Map"]').focus(); //FOCUS MAP SO CTRLS WORK
  });
  return controlButton;
}
// CREATES ACCESSBILITY GUESS BTN CONTROL
function createAccessibleGuessBtn(map) {
  controlButton = document.createElement("button");
  controlButton.setAttribute("id", "accessible-guess-button");
  controlButton.title = "Click to guess at map center";
  controlButton.type = "button";
  controlButton.innerText = "Guess (map center)";
  // REGISTER GUESS ON BTN CLICK
  controlButton.addEventListener("click", registerAccessibleGuess, {
    once: true,
  });
  return controlButton;
}

function registerGuess(event) {
  // GET GEO LOCATION OF USER GUESS
  let userClick = event.latLng;
  let lat = userClick.lat();
  let lng = userClick.lng();
  userGuessResult = { lat: lat, lng: lng };

  // CLEAR MAP LISTENERS TO FORCE SINGLE CLICK GUESS ONLY
  google.maps.event.clearInstanceListeners(map);

  // CLEAR BTN LISTENERS TO FORCE SINGLE CLICK GUESS ONLY
  controlButton.removeEventListener("click", registerAccessibleGuess);
  roundNumber++;

  // CALL FUNCTION TO CALC DISTANCE AND SCORE
  getDistance();
}

function registerAccessibleGuess(event) {
  // GET GEO LOCATION OF USER GUESS
  let userClick = map.getCenter();
  let lat = userClick.lat();
  let lng = userClick.lng();
  userGuessResult = { lat: lat, lng: lng };

  // CLEAR MAP LISTENERS TO FORCE SINGLE CLICK GUESS ONLY
  google.maps.event.clearInstanceListeners(map);
  roundNumber++;

  // CALL FUNCTION TO CALC DISTANCE AND SCORE
  getDistance();
}

// SHOW ERROR MESSAGE IF APP FAILS TO FETCH DATA
const showFetchErrorMessage = () => {
  let fetchErrorMessage = document.createElement("p");
  fetchErrorMessage.innerText =
    "Oops! Looks like we're having some issues! Please refresh the page or try again later.";
  document.querySelector("main").appendChild(fetchErrorMessage);
};

async function main() {
  try {
    await fetchData(); //GET LOCATION DATA
    await initMap(); //INIT MAP OBJECT
    await initStreetView(); //INIT STREET VIEW OBJECT
    changeStreetView(); //SET INITIAL STREET VIEW
  } catch {
    showFetchErrorMessage();
  }
}

main();