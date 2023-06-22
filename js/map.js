import {showCard} from './map-card.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 9;
// const MARKERS_COUNT = 10;

// const mapCanvas = document.querySelector('.map');

const simpleIconConfig = {
  url: '../img/pin.svg',
  width: 36,
  height: 46,
  anchorX: 18,
  anchorY: 46
};
const verifiedIconConfig = {
  url: '../img/pin-verified.svg',
  width: 36,
  height: 46,
  anchorX: 18,
  anchorY: 46
};
const cityCenter = {
  lat: 59.92749,
  lng: 30.31127,
};

// let mainMarker;
// let mainMarkerTempCoordinate;
// let mainMarkerCoordinate;
// let map;
let markerGroup;
// let defaultMarkers;
// let filteredMarkers;

const map = L.map('map-canvas');

const resetMapSize = () => {
  map.invalidateSize();
  // mapCanvas.style.zIndex = '10';
};

const renderMap = () => {
  map.setView(cityCenter, ZOOM);
  L.tileLayer(TILE_LAYER, {attribution: COPYRIGHT}).addTo(map);
  // map.scrollWheelZoom.disable();
};

const resetMarkers = () => {
  markerGroup.clearLayers();
  map.setView(cityCenter, ZOOM);
  // mainMarker.setLatLng(cityCenter);
  // addressField.value = Object.values(cityCenter).join(', ');
};

const getIconConfig = (iconConfig) => ({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY]
});

// const renderMainMarker = () => {
//   const mainIcon = L.icon(getIconConfig(verifiedIconConfig));

//   mainMarker = L.marker(cityCenter, {
//     draggable: true,
//     icon: mainIcon
//   });

//   mainMarker.addTo(map);
//   mainMarker.on('moveend', (evt) => {
//     mainMarkerTempCoordinate = Object.values(evt.target.getLatLng());
//     mainMarkerCoordinate = mainMarkerTempCoordinate.map((coordinate) => coordinate.toFixed(5)).join(', ');
//     // addressField.value = mainMarkerCoordinate;
//   });

//   if (!mainMarkerCoordinate) {
//     resetMainMarker();
//   }
// };

// const renderMarkers = ({author, location, offer}) => {
const renderMarkers = ({id, isVerified, userName, exchangeRate, minAmount, balance, paymentMethods, coords}) => {
  let simpleIcon;
  // console.log (`coords: ${coords}`);
  if (!isVerified) {
    simpleIcon = L.icon(getIconConfig(simpleIconConfig));
  } else {
    simpleIcon = L.icon(getIconConfig(verifiedIconConfig));
  }

  const lat = (coords.lat).toFixed(5);
  const lng = (coords.lng).toFixed(5);
  const marker = L.marker(
    {
      lat,
      lng
    },
    {
      simpleIcon
    }
  );
  marker.addTo(markerGroup).bindPopup(showCard({id, isVerified, userName, exchangeRate, minAmount, balance, paymentMethods}));
  // marker.addTo(markerGroup);
};

const createMarkers = (data) => {
  // markerGroup.clearLayers();
  markerGroup = L.layerGroup().addTo(map);
  // const ads = data.slice(0, MARKERS_COUNT);
  data.forEach((marker) => renderMarkers(marker));
  // data.forEach(({userName}) => {
  //   // renderMarkers(marker)
  //   console.log(`data.Name: ${userName}`);
  // });
};

// const activateFilteredMarkers = (points) => {
//   defaultMarkers = points;
//   filteredMarkers = points;
// };


const resetMarkersPopup = () => {
  map.closePopup();
};

// export {renderMap, renderMainMarker, createMarkers, activateFilteredMarkers, resetMainMarker, resetMarkersPopup, resetFilter};
export {resetMapSize, renderMap, createMarkers, resetMarkers, resetMarkersPopup};
