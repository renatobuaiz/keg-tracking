import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClientesService } from 'src/app/core/clientes.service';
import { Router } from '@angular/router';

export interface ClienteArray {
  id: number;
  nomeFantasia: string;
  latitude: number;
  longitude: number;
  acoes: string;          // adicionado para criar a columa de ações na UI
}

@Component({
  selector: 'keg-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.css']
})
export class ListagemClientesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nomeFantasia', 'latitude', 'longitude','acoes'];
  dataSource: MatTableDataSource<ClienteArray>;

  // clientes: Cliente[] = [];
  arrayClientes: ClienteArray[] = [];

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private clientesService: ClientesService,
              private router: Router) { }

  ngOnInit() {
    this.listarClientes();
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private listarClientes(): void {
    this.clientesService.listar()
    .subscribe((clientes: Cliente[]) => {
      for(let value of clientes) {
        clientes.values().next();
        var myCli = {
          id: value.id,
          nomeFantasia: value.nomeFantasia,
          latitude: value.posicaoGPS.latitude,
          longitude: value.posicaoGPS.longitude,
          acoes: ''
        };
        this.arrayClientes.push(myCli);
      }
      // this.clientes.push(...clientes);
      this.dataSource.data = this.arrayClientes;
    })
  }

  abrir(id: string): void {
    this.router.navigateByUrl('/visualizar/' + id);
  }

  // Filtro da UI
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
