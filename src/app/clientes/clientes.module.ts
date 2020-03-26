import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { CamposModule } from '../shared/components/campos/campos.module';
import { ListagemClientesComponent } from './listagem-clientes/listagem-clientes.component';
import { VisualizarClienteComponent } from './visualizar-cliente/visualizar-cliente.component';



@NgModule({
  declarations: [
    CadastroClientesComponent,
    ListagemClientesComponent,
    VisualizarClienteComponent
  ],
  imports: [
    CommonModule,
/*    RouterModule.forChild([
      {path: 'cadastro-clientes', component: CadastroClientesComponent}
    ]), */
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    InfiniteScrollModule,
    CamposModule
  ]
})
export class ClientesModule { }
