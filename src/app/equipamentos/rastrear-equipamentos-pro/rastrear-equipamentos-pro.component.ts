import {  Component, OnInit,
          AfterViewInit, ViewChild, ElementRef } from '@angular/core';  // p/ GoogleMaps
import { LatLng } from '@agm/core';

@Component({
  selector: 'app-rastrear-equipamentos-pro',
  templateUrl: './rastrear-equipamentos-pro.component.html',
  styleUrls: ['./rastrear-equipamentos-pro.component.css']
})

export class RastrearEquipamentosProComponent implements AfterViewInit {
  // Use this API as the last resort when direct access to DOM is needed. 
  // Use templating and data-binding provided by Angular instead.
  // @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  map: google.maps.Map;
  zoom: number = 8;
  lat: number = -19.919044;
  lng: number = -43.938655;
  
  coordinate = new google.maps.LatLng(this.lat, this.lng);
  bounds = new google.maps.LatLngBounds();

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
      title: 'Empório Du Carmo',
      label: 'Empório Du Carmo'
	  },
	  {
		  position: new google.maps.LatLng(-19.940726, -43.947880),
      map: this.map,
      title: 'Brewhouse',
      label: 'Brewhouse'
	  },
	  {
      position: new google.maps.LatLng(-19.945153, -43.920599),
      map: this.map,
      title: 'Rhara',
      label: 'Rhara'
    },
    {
      position: new google.maps.LatLng(-19.936406, -43.935217),
      map: this.map,
      title: 'Growleria',
      label: 'Growleria'
	  }
  ]

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    // Use this API as the last resort when direct access to DOM is needed. 
    // Use templating and data-binding provided by Angular instead.
    // this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOtions);
    this.map = new google.maps.Map(document.getElementById("map"), this.mapOtions);

    // Adding default marker to map
    this.marker.setMap(this.map);
    
    // Adding Click event to default marker
    this.marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      })
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    // Adding other markers
    this.loadAllMarkers();

    // Verificando se o device tem geolocaliação e adicionando o marcados da posição atual
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const actualPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // criando um marcador para mostrar a localização atual
        const actualLocation = new google.maps.Marker({
          position: actualPosition,
          map: this.map
        });

        // incluindo a posição atual no Bounds e centralizando o mapa
        this.bounds.extend(actualLocation.getPosition());
        this.map.fitBounds(this.bounds);
        actualLocation.setMap(this.map);

        // criando um InfoWindow para mostrar as infos de Lat/Lng
        const infoWindow = new google.maps.InfoWindow({
          content: (`Lat: ${actualPosition.lat}, Lng: ${actualPosition.lng}`)
        });
        
        // criando o evento click no marcador para abrir a janela do InfoWindow
        actualLocation.addListener('click', () => {infoWindow.open(actualLocation.getMap(), actualLocation);});

      // mensagem caso o device não tenha suporte à geolocalização
      }, () => 
        { console.log('Location not found.'); }
      );
    }

    // Testando o cálculo de distância entre duas posições
    var d = google.maps.geometry.spherical.computeDistanceBetween(this.markers[0].position, this.markers[1].position);
    console.log('Distância: ' + (d/1000) + ' km.');

    // Testando Places: Restricted Daily Quota / Billing Needed
/*
    var requestPlaces = {
      location: this.coordinate,
      radius: 3000
    }
    var service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(requestPlaces, ((results, status) => {
      if(status == google.maps.places.PlacesServiceStatus.OK) {
        for(var i=0; i < results.length; i++) {
          console.log(`${i} - ${results[i].types}`);
          var place = new google.maps.Marker({
            map: this.map,
            title: results[i].name,
            label: results[i].name,
            position: results[i].geometry.location
          });
          this.bounds.extend(results[i].geometry.location);
          this.map.fitBounds(this.bounds);
          place.setMap(this.map);
        }
      }
    }))
*/
    // Testando o geocoding e o reverse geocoding: Billing Needed
    /*
    var geo = new google.maps.Geocoder();
    var address = 'Rua Comandante Duarte Carneiro, 44, Centro, Vitória, ES, Brasil';
    geo.geocode({'address': address}, (results, status) => {
      if(status === 'OK') {
        this.map.setCenter(results[0].geometry.location);
        var geoMarker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });*/

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

      // Centralizando o mapa de acordo com os marcadores
      this.bounds.extend(markerInfo.position);
      this.map.fitBounds(this.bounds)

      //Adding marker to google map
      marker.setMap(this.map);
    })
  }

}
