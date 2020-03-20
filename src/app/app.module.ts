import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { ClientesModule } from './clientes/clientes.module';
import { RastrearEquipamentosComponent } from './equipamentos/rastrear-equipamentos/rastrear-equipamentos.component';
import { RastrearEquipamentosProComponent } from './equipamentos/rastrear-equipamentos-pro/rastrear-equipamentos-pro.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'equipamentos', pathMatch: 'full'},
      {path: 'equipamentos', component: RastrearEquipamentosComponent},
      {path: 'equipamentos-pro', component: RastrearEquipamentosProComponent}
    ]),
    EquipamentosModule,
    ClientesModule
  ],
  exports: [],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
