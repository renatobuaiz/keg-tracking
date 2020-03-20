import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { RastrearEquipamentosComponent } from './rastrear-equipamentos/rastrear-equipamentos.component';

@NgModule({
  declarations: [
    RastrearEquipamentosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'equipamentos', component: RastrearEquipamentosComponent}
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyChOiFA_ghDfHOp-NxvS0G6Ga8RXCkvqvo' 
    })
  ],
  exports: []
})
export class EquipamentosModule { }
