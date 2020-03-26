import { Component, AfterViewInit } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClientesService } from 'src/app/core/clientes.service';
import { MapasService } from 'src/app/core/mapas.service';

@Component({
  selector: 'keg-rastrear-equipamentos-pro',
  templateUrl: './rastrear-equipamentos-pro.component.html',
  styleUrls: ['./rastrear-equipamentos-pro.component.css']
})

export class RastrearEquipamentosProComponent implements AfterViewInit {

  clientes: Cliente[] = [];
  mapa: google.maps.Map;
  bounds: google.maps.LatLngBounds;

  constructor(private clientesService: ClientesService,
              private mapasService: MapasService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    // inicializando mapa e bounds
    this.mapa = new google.maps.Map(document.getElementById("map"));
    this.bounds = new google.maps.LatLngBounds();

    // recuperando a lista de clientes e plotando os marcadores
    this.clientesService.listar().subscribe((clientes) => {
      this.clientes = clientes;
      this.bounds = this.mapasService.plotarMapa(this.mapa, this.bounds, this.clientes);
    });
    this.bounds = this.mapasService.plotarMapa(this.mapa, this.bounds,
      [{nomeFantasia: 'Home', posicaoGPS: {latitude: -20.299497, longitude: -40.295947}}]
    );
    this.bounds = this.mapasService.plotarMapa(this.mapa, this.bounds,
      [{nomeFantasia: 'RJ', posicaoGPS: {latitude: -22.903838, longitude: -43.172897}}]
    );
  }

}
