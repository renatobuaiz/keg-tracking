import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputDateComponent } from './input-date/input-date.component';
import { TextAreaComponent } from './textarea/textarea.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [
    InputTextComponent, 
    InputNumberComponent, 
    InputDateComponent, 
    TextAreaComponent, 
    InputSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    InputTextComponent, 
    InputNumberComponent, 
    InputDateComponent, 
    TextAreaComponent, 
    InputSelectComponent
  ]
})
export class CamposModule { }
