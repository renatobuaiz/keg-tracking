import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/core/clientes.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'keg-visualizar-cliente',
  templateUrl: './visualizar-cliente.component.html',
  styleUrls: ['./visualizar-cliente.component.css']
})
export class VisualizarClienteComponent implements OnInit {

  cliente: Cliente;
  id: number;

  constructor(public dialog: MatDialog,
              private rotaAtiva: ActivatedRoute,
              private route: Router,
              private serviceClientes: ClientesService) { }

  ngOnInit() {
    this.id = this.rotaAtiva.snapshot.params['id'];
    this.visualizar(this.id);
  }

  private visualizar(id: number) {
    this.serviceClientes.visualizar(id).subscribe((cliente: Cliente) => this.cliente = cliente);
  }

  private editar(id: number) {
    this.route.navigateByUrl('clientes/' + this.id);
  }

  private excluir(id: number) {
    const config = {
      data: {
        titulo: 'Tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certeza clique em <Prosseguir>',
        btnCorCancelar: 'primary',
        btnCorSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if(opcao) {
        this.serviceClientes.excluir(this.id).subscribe(() => this.route.navigateByUrl('/listagem'));
      }
    });
  }

}
