import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { RastrearEquipamentosComponent } from './rastrear-equipamentos/rastrear-equipamentos.component';
import { RastrearEquipamentosProComponent } from './rastrear-equipamentos-pro/rastrear-equipamentos-pro.component';

@NgModule({
  declarations: [
    RastrearEquipamentosComponent,
    RastrearEquipamentosProComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'equipamentos', component: RastrearEquipamentosComponent}
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw' 
    })
  ],
  exports: []
})
export class EquipamentosModule { }
