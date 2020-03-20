import { Component, OnInit } from '@angular/core';

import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-rastrear-equipamentos',
  templateUrl: './rastrear-equipamentos.component.html',
  styleUrls: ['./rastrear-equipamentos.component.css']
})
export class RastrearEquipamentosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
  }
  
  // google maps zoom level
  zoom: number = 14;
  
    // initial center position for the map
  lat: number = -19.919044;
  lng: number = -43.938655;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
	  {
		  lat: -19.931440,
		  lng: -43.954082,
		  label: 'Empório Du Carmo',
		  draggable: true
	  },
	  {
		  lat: -19.940726,
		  lng: -43.947880,
		  label: 'Brewhouse',
		  draggable: false
	  },
	  {
		  lat: -19.945153,
		  lng: -43.920599,
		  label: 'Rhara',
		  draggable: true
    },
    {
		  lat: -19.936406,
		  lng: -43.935217,
		  label: 'Growleria',
		  draggable: true
	  }
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
