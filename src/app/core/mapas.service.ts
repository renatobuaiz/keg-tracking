import { Injectable } from '@angular/core';

import { Cliente } from '../shared/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class MapasService {

  constructor() { }

  plotarMapa(map: google.maps.Map, bounds: google.maps.LatLngBounds, clientes: Cliente[]
             ): google.maps.LatLngBounds {

    for(let cliente of clientes) {
      const markerInfo = {
        map: map,
        label: cliente.nomeFantasia,
        position: new google.maps.LatLng(cliente.posicaoGPS.latitude, cliente.posicaoGPS.longitude),
        title: ('<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>')
      }

      // creating marker on map
      const marker = new google.maps.Marker({...markerInfo});
      
      // creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      // Centralizando o mapa de acordo com os marcadores
      bounds.extend(markerInfo.position);
      map.fitBounds(bounds);

      //Adding marker to google map
      marker.setMap(map);
    }
    return bounds;
  }

}
