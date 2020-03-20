import {  Component, OnInit,
          AfterViewInit, ViewChild, ElementRef } from '@angular/core';  // p/ GoogleMaps

@Component({
  selector: 'app-rastrear-equipamentos-pro',
  templateUrl: './rastrear-equipamentos-pro.component.html',
  styleUrls: ['./rastrear-equipamentos-pro.component.css']
})

export class RastrearEquipamentosProComponent implements AfterViewInit {
  title = 'angula-gmap';
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  map: google.maps.Map;
  zoom: number = 8;
  lat: number = -19.919044;
  lng: number = -43.938655;

  coordinate = new google.maps.LatLng(this.lat, this.lng);

  mapOtions: google.maps.MapOptions = {
    center: this.coordinate,
    zoom: this.zoom
  }

  marker = new google.maps.Marker({
    position: this.coordinate,
    map: this.map
  })

  markers = [
	  {
		  position: new google.maps.LatLng(-19.931440, -43.954082),
      map: this.map,
      title: 'Empório Du Carmo'
	  },
	  {
		  position: new google.maps.LatLng(-19.940726, -43.947880),
      map: this.map,
		  title: 'Brewhouse'
	  },
	  {
      position: new google.maps.LatLng(-19.945153, -43.920599),
      map: this.map,
		  title: 'Rhara'
    },
    {
      position: new google.maps.LatLng(-19.936406, -43.935217),
      map: this.map,
		  title: 'Growleria'
	  }
  ]



  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOtions);

    //Adding Click event to default marker
    this.marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      })
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    //Adding default marker to map
    this.marker.setMap(this.map);

    //Adding other markers
    this.loadAllMarkers();

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const actualPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const infoWindow = new google.maps.InfoWindow({
          content: (`Lat: ${actualPosition.lat}, Lng: ${actualPosition.lng}`),
          position: actualPosition
        });
        infoWindow.open(this.map);
      }, () => 
        { console.log('Location not found.'); }
      );
    }
  }

  loadAllMarkers() {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });
      
      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });
      
      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    })
  }

}
