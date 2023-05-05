const JSON_PATH = "assets/data/attractions.json";

let map;
let data;
let activeInfoWindow = false;
let linkIcon;
let markerIcon;

// CHECKS IS USER IS FIRST TIME VISITOR
const checkIfVisited = () => {
  if (window.localStorage.getItem("visited") === null) {
    window.localStorage.setItem("visited", "true");
    showFirstTimeVisitModal(); // SHOW MODAL IF FIRST VISIT
  }
};

// FUNCTION TO SHOW FIRST TIME VISIT MODAL
const showFirstTimeVisitModal = () => {
  const modalWindow = document.querySelector(".first-visit-modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalContainer = document.querySelector(".modal-container");
  modalWindow.classList.add("modal-visible");
  modalOverlay.classList.add("modal-overlay-visible");
  modalContainer.classList.add("modal-container-visible");

  // HIDE MODAL IF USER CLICKS OUTSIDE
  modalContainer.addEventListener("click", () => {
    modalWindow.classList.remove("modal-visible");
    modalOverlay.classList.remove("modal-overlay-visible");
    modalContainer.classList.remove("modal-container-visible");
  });
};

// INITIALISE MAP
async function initMap() {
  // SET INIT POSITION AT IRELAND
  const position = { lat: 53.4152431, lng: -7.9559668 };

  try {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
      mapId: "47f8f1437cc57452", // PERSONAL GMAPS ID WITH CUSTOM STYLES
      zoom: 7,
      center: position,
      clickableIcons: false, //DISABLES NATIVE CLICKABLE PLACE ICONS
    });
  } catch (error) {
    showFetchErrorMessage();
  }
}

// FETCH ATTRACTION DATA FROM FAILTE IRELAND DATASET attractions.json
async function fetchData() {
  try {
    const getData = await fetch(JSON_PATH);
    data = await getData.json();
    return data;
  } catch (error) {
    showFetchErrorMessage();
  }
}

// PLOT ALL MARKERS ON MAP INITIALLY
const initMarkers = async () => {
  try {
  await fetchData();
  } catch {
    showFetchErrorMessage()
  }

  // ITERATE THROUGH ALL DATA POINTS, DEFINE VARIABLES,
  // DEFINE MARKER ICONS, DEFINE CONTENT
  for (let i = 0; i < data.length; i++) {
    // DETRUCTURE OBJ TO DEFINE VARIABLES
    const {
      Latitude: lat,
      Longitude: lng,
      Name,
      AddressLocality,
      AddressRegion,
      Tags,
      Url,
      Telephone,
    } = data[i];

    // IF ADDRESS LOCAILTY DATA NON-EXISTANT, EXCLUDE
    if (AddressLocality.length === 0) {
      markerAddress = `${AddressRegion}`;
    } else markerAddress = `${AddressLocality}, ${AddressRegion}`;

    // CHECK ATTRACTION TAGS AND SET MARKER ICON
    markerIcon = setMarkerIcons(Tags, markerIcon);

    //CREATE MAP MARKER
    const { Marker } = await google.maps.importLibrary("marker");
    const marker = new Marker({
      map: map,
      position: { lat: lat, lng: lng },
      title: Name,
      icon: markerIcon,
      optimized: false, //REQUIRED FOR KEYBOARD NAVIGATION
    });

    // URL STRUCTURE TO GET DIRECTIONS ON GMAPS
    const directionsURL = `"https://www.google.com/maps?saddr=My+Location&daddr=${Name}, ${markerAddress}"`;
    // ADD INFOWINDOW TO MARKERS
    const infowindow = new google.maps.InfoWindow({
      ariaLabel: `${Name}`,
    });

    // CLOSE ACTIVE MARKER INFOWINDOW IF NEW OPENED
    marker.addListener("click", () => {
      if (activeInfoWindow) {
        activeInfoWindow.close();
      }

      activeInfoWindow = infowindow;

      infowindow.open({
        anchor: marker,
        map,
      });
    });

    map.addListener("click", () => {
      if (activeInfoWindow) {
        activeInfoWindow.close();
      }

      activeInfoWindow = infowindow;
    });

    // CREATE A DIV FOR ATTRACTION INFO AND APPEND TO SEARCH RESULTS CONTAINER
    attractionListInfo = document.createElement("div");
    attractionListInfo.setAttribute("class", "attractionListInfoDiv");
    searchContainer.append(attractionListInfo);

    // ADD MARKER TO MARKERS ARRAY
    markers.push(marker);

    checkAttractionDataValidity(
      Name,
      markerAddress,
      Url,
      Telephone,
      directionsURL
    );

    // SET THE CONTENT OF MARKER INFOWINDOWS
    infowindow.setContent(attractionListInfo.innerHTML);
  }
};

const markers = [];
const searchContainer = document.querySelector("#search-container-results");
let attractionListInfo;

const positionMarker = async (searchQuery) => {
  //CLEAR ALL EXISTING MARKERS
  for (marker of markers) {
    marker.setMap(null);
  }
  markers.length = 0;

  //CLEAR ALL EXISTING SEARCH RESULTS
  let clearAttractionsList = document.querySelectorAll(
    ".attractionListInfoDiv"
  );
  if (clearAttractionsList) {
    for (attractions of clearAttractionsList) {
      attractions.remove();
    }
  }

  // ITERATE THROUGH ALL DATA POINTS, DEFINE VARIABLES,
  // DEFINE MARKER ICONS, DEFINE CONTENT
  for (let i = 0; i < data.length; i++) {
    // DETRUCTURE OBJ TO DEFINE VARIABLES
    const {
      Latitude: lat,
      Longitude: lng,
      Name,
      AddressLocality,
      AddressRegion,
      Tags,
      Url,
      Telephone,
    } = data[i];

    // IF ADDRESS LOCAILTY DATA NON-EXISTANT, EXCLUDE
    if (AddressLocality.length === 0) {
      markerAddress = `${AddressRegion}`;
    } else markerAddress = `${AddressLocality}, ${AddressRegion}`;

    markerIcon = setMarkerIcons(Tags, markerIcon);

    // IF SEARCH IS EMPTY
    if (searchQuery === undefined || searchQuery === null) {
      //CREATE MAP MARKER
      const { Marker } = await google.maps.importLibrary("marker");
      const marker = new Marker({
        position: { lat: lat, lng: lng },
        title: Name,
        icon: markerIcon,
      });
      // URL STRUCTURE TO GET DIRECTIONS ON GMAPS
      const directionsURL = `"https://www.google.com/maps?saddr=My+Location&daddr=${Name}, ${markerAddress}"`;
      // ADD INFOWINDOW TO MARKERS
      const infowindow = new google.maps.InfoWindow({
        ariaLabel: `${Name}`,
      });

      // CLOSE ACTIVE MARKER INFOWINDOW IF NEW OPENED
      marker.addListener("click", () => {
        if (activeInfoWindow) {
          activeInfoWindow.close();
        }
        activeInfoWindow = infowindow;
        infowindow.open({
          anchor: marker,
          map,
        });
      });

      map.addListener("click", () => {
        if (activeInfoWindow) {
          activeInfoWindow.close();
        }

        activeInfoWindow = infowindow;
      });

      markers.push(marker);

      // CHECK FOR VALID SEARCH, SHOW ERROR MSG
      if (markers.length === 0) {
        console.log("empty query");
        searchBar.classList.add("search-invalid");

        let errorMsgSpan = document.querySelector("#search-error-message");
        errorMsgSpan.classList.remove("hidden");
      } else {
        errorMsgSpan.classList.add("hidden");
        searchBar.classList.remove("search-invalid");
      }
    }

    // IF SEARCH QUERY MATCHES ATTRACTION DATA
    else if (
      Tags.toLowerCase().includes(searchQuery) ||
      Name.toLowerCase().includes(searchQuery) ||
      markerAddress.toLowerCase().includes(searchQuery)
    ) {
      const markerPos = { lat, lng };
      const { Marker } = await google.maps.importLibrary("marker");
      const marker = new Marker({
        position: { lat: lat, lng: lng },
        title: Name,
        icon: markerIcon,
        optimized: false, //REQUIRED FOR KEYBOARD NAVIGATION
      });
      const directionsURL = `"https://www.google.com/maps?saddr=My+Location&daddr=${Name}, ${markerAddress}"`;
      const infowindow = new google.maps.InfoWindow({
        ariaLabel: `${Name}`,
      });

      marker.addListener("click", () => {
        if (activeInfoWindow) {
          activeInfoWindow.close();
        }

        activeInfoWindow = infowindow;

        infowindow.open({
          anchor: marker,
          map,
        });
      });
      attractionListInfo = document.createElement("div");
      attractionListInfo.setAttribute("class", "attractionListInfoDiv");
      // IF URL IS NON-EXISTANT, USE THIS CONTENT FOR LIST AND INFOWINDOWS
      checkAttractionDataValidity(
        Name,
        markerAddress,
        Url,
        Telephone,
        directionsURL
      );
      // SET THE CONTENT OF MARKER INFOWINDOWS
      infowindow.setContent(attractionListInfo.innerHTML);
      // SET THE CONTENT OF SEARCH RESULTS
      searchContainer.append(attractionListInfo);
      markers.push(marker);
    }
  }

  // PLOT EACH MARKER ON MAP
  for (marker of markers) {
    marker.setMap(map);
  }

  let errorMsgSpan = document.querySelector("#search-error-message");
  if (markers.length === 0) {
    console.log("empty query");
    searchBar.classList.add("search-invalid");
    errorMsgSpan.classList.remove("hidden");
  } else {
    errorMsgSpan.classList.add("hidden");
    searchBar.classList.remove("search-invalid");
  }
};

let searchQuery;
const searchBar = document.querySelector("#search");

const performSearch = (callback) => {
  searchBar.addEventListener("input", function () {
    searchQuery = searchBar.value.toLowerCase(); //GET SEARCH INPUT
    callback(searchQuery); //PASS searchQuery TO CALLBACK FUNCTION
  });
};

// MAIN FUNCTION TO RUN APP
const main = async () => {
  checkIfVisited();
  initMap();
  initMarkers();
  await fetchData();
  performSearch((searchQuery) => positionMarker(searchQuery));
};

// FUNCTION TO RUN WHEN CHEVRON CLICKED
const openDrawer = () => {
  const searchBar = document.querySelector("#search");
  const searchContainer = document.querySelector("#search-container");
  const searchContainerHeadChevron = document.querySelector("#drawer-chevron");
  const searchContainerResults = document.querySelector(
    "#search-container-results"
  );
  searchBar.classList.toggle("search-open");
  searchContainer.classList.toggle("search-container-open");
  searchContainerHeadChevron.classList.toggle("drawer-chevron-open");
  searchContainerResults.classList.toggle("search-container-results-open");
  document.querySelector("#search-bar-container").classList.toggle("visible");
};

// LISTEN FOR CLICK ON CHEVRON, THEN RUN ABOVE FUNCTION TO OPEN DRAWER
const searchContainerOpener = document.querySelector(
  "#drawer-chevron-container"
);
searchContainerOpener.addEventListener("click", openDrawer);

const checkAttractionDataValidity = (
  Name,
  markerAddress,
  Url,
  Telephone,
  directionsURL
) => {
  // IF URL IS NON-EXISTANT, USE THIS CONTENT FOR LIST AND INFOWINDOWS
  if (Url.length < 5 && Telephone.length > 7) {
    attractionListInfo.innerHTML = `<h4>${Name}</h4>
      ${markerAddress}
      <div class = "attraction-info-button-container">
      <a class = "attraction-info-button fa-solid fa-link grey" aria-label = "This attraction does not have a website" title = "This attraction does not have a website"></a>
      <a class = "attraction-info-button fa-solid fa-phone" href = tel:+${Telephone} aria-label = "Click to call attraction" title = "Click to call attraction"></a>
      <a class = "attraction-info-button fa-solid fa-compass fa-lg" href = ${directionsURL} target="_blank" aria-label = "Click to get directions to attraction. Opens Google Maps." title = "Click to get directions to attraction - Opens Google Maps"></a>
      </div>`;
  }
  // IF TELEPHONE IS NON-EXISTANT, USE THIS CONTENT FOR LIST AND INFOWINDOWS
  else if (Url.length > 5 && Telephone.length < 5) {
    attractionListInfo.innerHTML = `<h4>${Name}</h4>
      ${markerAddress}
      <div class = "attraction-info-button-container">
      <a class = "attraction-info-button fa-solid fa-link" href = ${Url} target="_blank" aria-label = "Click to open attraction website in new tab" title = "Click to open attraction website in new tab"></a>
      <a class = "attraction-info-button fa-solid fa-phone grey" aria-label = "This attraction does not have a phone number" title = "This attraction does not have a phone number"></a>
      <a class = "attraction-info-button fa-solid fa-compass fa-lg" href = ${directionsURL} target="_blank" aria-label = "Click to get directions to attraction. Opens Google Maps." title = "Click to get directions to attraction - Opens Google Maps"></a>
      </div>`;
  }
  // IF URL & TELEPHONE ARE NON-EXISTANT, USE THIS CONTENT FOR LIST AND INFOWINDOWS
  else if (Url.length < 5 && Telephone.length < 5) {
    attractionListInfo.innerHTML = `<h4>${Name}</h4>
      ${markerAddress}
      <div class = "attraction-info-button-container">
      <a class = "attraction-info-button fa-solid fa-link grey" aria-label = "This attraction does not have a website" title = "This attraction does not have a website"></a>
      <a class = "attraction-info-button fa-solid fa-phone grey" aria-label = "This attraction does not have a phone number" title = "This attraction does not have a phone number"></a>
      <a class = "attraction-info-button fa-solid fa-compass fa-lg" href = ${directionsURL} target="_blank" aria-label = "Click to get directions to attraction. Opens Google Maps." title = "Click to get directions to attraction - Opens Google Maps"></a>
      </div>`;
  }
  // OTHERWISE IF URL & TELEPHONE ARE VALID, USE THIS CONTENT FOR LIST AND INFOWINDOWS
  else {
    attractionListInfo.innerHTML = `<h4>${Name}</h4>
      ${markerAddress}
      <div class = "attraction-info-button-container">
      <a class = "attraction-info-button fa-solid fa-link" href = ${Url} target="_blank" aria-label = "Click to open attraction website in new tab" title = "Click to open attraction website in new tab"></a>
      <a class = "attraction-info-button fa-solid fa-phone" href = tel:+${Telephone} aria-label = "Click to call attraction" title = "Click to call attraction"></a>
      <a class = "attraction-info-button fa-solid fa-compass fa-lg" href = ${directionsURL} target="_blank" aria-label = "Click to get directions to attraction. Opens Google Maps." title = "Click to get directions to attraction - Opens Google Maps"></a>
      </div>`;
  }
};

const setMarkerIcons = (Tags, markerIcon) => {
  if (Tags.includes("Castle"))
    markerIcon = "assets/img/map-icons/icon-castle.png";
  else if (Tags.includes("Museum"))
    markerIcon = "assets/img/map-icons/icon-museum.png";
  else if (
    Tags.includes("Natural Landscape") ||
    Tags.includes("Nature") ||
    Tags.includes("Garden") ||
    Tags.includes("Forest")
  )
    markerIcon = "assets/img/map-icons/icon-hiking.png";
  else if (Tags.includes("Food") || Tags.includes("Cafe"))
    markerIcon = "assets/img/map-icons/icon-restaurant.png";
  else if (Tags.includes("Church"))
    markerIcon = "assets/img/map-icons/icon-church.png";
  else if (Tags.includes("Public Sculpture") || Tags.includes("Art Gallery"))
    markerIcon = "assets/img/map-icons/icon-art.png";
  else if (Tags.includes("Craft") || Tags.includes("Shopping"))
    markerIcon = "assets/img/map-icons/icon-shopping.png";
  else if (Tags.includes("Beach") || Tags.includes("River"))
    markerIcon = "assets/img/map-icons/icon-water.png";
  else if (
    Tags.includes("Gaa") ||
    Tags.includes("Sports") ||
    Tags.includes("Stadium")
  )
    markerIcon = "assets/img/map-icons/icon-sport.png";
  else if (Tags.includes("Embarkation Point") || Tags.includes("Island"))
    markerIcon = "assets/img/map-icons/icon-boat.png";
  else if (
    Tags.includes("Literary") ||
    Tags.includes("Library") ||
    Tags.includes("Learning")
  )
    markerIcon = "assets/img/map-icons/icon-book.png";
  else if (
    Tags.includes("Zoos") ||
    Tags.includes("Aquarium") ||
    Tags.includes("Farm")
  )
    markerIcon = "assets/img/map-icons/icon-zoo.png";
  else if (Tags.includes("Cycling") || Tags.includes("Cycle"))
    markerIcon = "assets/img/map-icons/icon-cycling.png";
  return markerIcon;
};

const showFetchErrorMessage = () => {
  let fetchErrorMessage = document.createElement("p");
  fetchErrorMessage.innerText =
    "Oops! Looks like we're having some issues! Please refresh the page or try again later.";
  document.querySelector("main").appendChild(fetchErrorMessage);
};

main();