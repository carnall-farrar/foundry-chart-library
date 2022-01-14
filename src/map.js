const mapboxgl = require('mapbox-gl');
require('mapbox-gl/dist/mapbox-gl.css');

export const instantiateMapboxMap = (containerId, token) => {
  mapboxgl.accessToken = token;
  new mapboxgl.Map({
    container: containerId, // container ID
    style: {
      'version': 8,
      'sources': {
        'raster-tiles': {
          'type': 'raster',
          'tiles': [
            `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}?access_token=${token}`
          ],
          'tileSize': 256,
          'attribution': ''
        }
      },
      'layers': [
        {
          'id': 'simple-tiles',
          'type': 'raster',
          'source': 'raster-tiles',
          'minzoom': 0,
          'maxzoom': 22
        }
      ]
    }, // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
};
