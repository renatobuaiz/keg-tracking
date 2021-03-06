import { Component, Input } from '@angular/core';
import { ValidarCamposService } from '../validar-campos.service';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent {

InputNumberComponent
  @Input() formGroup: FormGroup;
  @Input() controlTitle: string;
  @Input() controlName: string;
  @Input() minimo = 0;
  @Input() maximo = 10;
  @Input() step = 1;

  constructor(public validacao: ValidarCamposService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
