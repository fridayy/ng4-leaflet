import {Component, OnInit} from '@angular/core';
import leaflet from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tileLayer: any;
  geoJSONStates: any;

  constructor() {
    // initialize the tileLayer in the constructor! It must be created before angular actually does any rendering
    this.tileLayer = leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })

    // create a GeoJSON (see: http://geojson.org/)
    // and: http://leafletjs.com/examples/geojson/
    this.geoJSONStates  = [{
      'type': 'Feature',
      'properties': {'party': 'Republican'},
      'geometry': {
        'type': 'Polygon',
        'coordinates': [[
          [-104.05, 48.99],
          [-97.22, 48.98],
          [-96.58, 45.94],
          [-104.03, 45.94],
          [-104.05, 48.99]
        ]]
      }
    }, {
      'type': 'Feature',
      'properties': {'party': 'Democrat'},
      'geometry': {
        'type': 'Polygon',
        'coordinates': [[
          [-109.05, 41.00],
          [-102.06, 40.99],
          [-102.03, 36.99],
          [-109.04, 36.99],
          [-109.05, 41.00]
        ]]
      }
    }];
  }

  ngOnInit(): void {
    // create the map object (3 determines the inital zoom level)
    // map(x) => x is the html id of the div where the map is rendered
    const map = leaflet.map('mapid').setView([51.505, -0.09], 3);
    // add the tile layer created in the construtor to the map
    map.addLayer(this.tileLayer);

    // add the geoJson object created in the constructor to the map
    leaflet.geoJSON(this.geoJSONStates, feature => {
        switch (feature.properties.party) {
          case 'Republican':
            return {color: '#ff0000'};
          case 'Democrat':
            return {color: '#0000ff'};
        }
    }).addTo(map);
  }
}
