// (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
//     ({key: "AIzaSyCbslAH8fUvbb6O544Xyq0iJBzK50vvX08", v: "beta"});


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
    let streetViewService = new google.maps.StreetViewService();

    let streetViewRequest = {
        location: streetPosition,
        radius: MAX_STREET_VIEW_RADIUS
    }
    let newStreetViewPano = new StreetViewPanorama(document.querySelector('#game-street-container'));

    let streetViewObject = streetViewService.getPanorama(streetViewRequest, (streetViewData, streetViewStatus) => {
        console.log(streetViewStatus)
        console.log(streetViewData)
        newStreetViewPano.setPano(streetViewData.location.pano)
        newStreetViewPano.setVisible(true)
})}
    

// window.initialize = initialize;
// fetchData(locationArray);

async function main() {
    await fetchData();
    await initMap();
    await initStreetView();
}

// window.initMap = initMap;
main();