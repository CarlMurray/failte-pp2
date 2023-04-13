// Initialize and add the map, code copied from Maps API documentation
let map;

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

// function to add marker to map, code copied from Maps API documentation and modified
const addMarker = async () => {
    // The marker, positioned at Ireland
    const { Marker } = await google.maps.importLibrary("marker");
    const marker = new Marker({
      map: map,
      position: { lat: 53.4152431, lng: -7.9559668 },
    });
  }

initMap();
addMarker();
