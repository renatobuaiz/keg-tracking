import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { APP_BASE_HREF } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { ClientesModule } from './clientes/clientes.module';
import { MaterialModule } from './shared/material/material.module';

import { AppComponent } from './app.component';
import { RastrearEquipamentosComponent } from './equipamentos/rastrear-equipamentos/rastrear-equipamentos.component';
import { RastrearEquipamentosProComponent } from './equipamentos/rastrear-equipamentos-pro/rastrear-equipamentos-pro.component';
import { TopoComponent } from './shared/components/topo/topo.component';
import { RodapeComponent } from './shared/components/rodape/rodape.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { CadastroClientesComponent } from './clientes/cadastro-clientes/cadastro-clientes.component';
import { ListagemClientesComponent } from './clientes/listagem-clientes/listagem-clientes.component';
import { VisualizarClienteComponent } from './clientes/visualizar-cliente/visualizar-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'equipamentos-pro', pathMatch: 'full'},
      {path: 'equipamentos', component: RastrearEquipamentosComponent},
      {path: 'equipamentos-pro', component: RastrearEquipamentosProComponent},
      {path: 'clientes', children: ([
        {path: '', component: CadastroClientesComponent},
        {path: ':id', component: CadastroClientesComponent}
        ])
      },
      {path: 'visualizar', children: ([
        {path: '', redirectTo: '/listagem', pathMatch: 'full'},
        {path: ':id', component: VisualizarClienteComponent}
        ])
      },
      {path: 'listagem', component: ListagemClientesComponent}
    ]),
    EquipamentosModule,
    ClientesModule,
    MaterialModule
  ],
  exports: [],
  entryComponents: [AlertComponent],
  providers: [{provide: APP_BASE_HREF, useValue : '/'},
              {provide: MAT_DATE_LOCALE, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
