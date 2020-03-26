import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Cliente } from 'src/app/shared/models/cliente';
import { ClientesService } from 'src/app/core/clientes.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';


@Component({
  selector: 'keg-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {

  cadastro: FormGroup;
  id: number;

  constructor(public dialog: MatDialog,
              public validacao: ValidarCamposService,
              private clienteService: ClientesService,
              private fb: FormBuilder,
              private activatedRouter: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params['id'];
    if (this.id) {
      this.clienteService.visualizar(this.id).subscribe((cliente: Cliente) => {
        this.criarFormulario(cliente);
      })
    } else {
      this.criarFormulario(this.criarCliente());
    }
  }

  private criarCliente(): Cliente {
    return {
      id: null,
      nomeFantasia: null,
      posicaoGPS: {
        latitude: null,
        longitude: null
      }
    } as Cliente;
  }

  private criarFormulario(cliente: Cliente): void {
    this.cadastro = this.fb.group({             // inserindo os controls (inputs do html)
      nomeFantasia: [cliente.nomeFantasia, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      latitude: [cliente.posicaoGPS.latitude, [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: [cliente.posicaoGPS.longitude, [Validators.required, Validators.min(-90), Validators.max(90)]]
    });
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  submit(): void {
    this.cadastro.markAllAsTouched;
    if(this.cadastro.invalid) {
      return;
    }
    // `as´ garante que o valor que está sendo passado é do tipo
    const rawValues = this.cadastro.getRawValue();
    const cliente: Cliente = {
      nomeFantasia: rawValues.nomeFantasia,
      posicaoGPS: {
        latitude: rawValues.latitude,
        longitude: rawValues.longitude
      }
    }
    if(this.id) {
      cliente.id = this.id;
      this.editar(cliente);
    } else {
      this.salvar(cliente);
    }
  }

  private editar(cliente: Cliente): void {
    this.clienteService.editar(cliente).subscribe(() => {
      const config = {
        data: {
          descricao: 'O registro foi atualizado com sucesso!',
          btnSucesso: 'Listagem'
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('listagem'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao atualizar o registro!',
          descricao: 'Não foi possível atualizar o registro, favor tentar novamente mais tarde.',
          btnSucesso: 'Fechar',
          btnCorSucesso: 'warn'
        } as Alerta
      };
      this.dialog.open(AlertComponent, config);
    });
  }

  private salvar(cliente: Cliente): void {
    this.clienteService.salvar(cliente).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Listagem',
          btnCancelar: 'Cadastro',
          btnCorCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe((botao: boolean) => {
        if(botao) {
          this.router.navigateByUrl('listagem');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não foi possível salvar o registro, favor tentar novamente mais tarde.',
          btnSucesso: 'Fechar',
          btnCorSucesso: 'warn'
        } as Alerta
      };
      this.dialog.open(AlertComponent, config);
    });
  }

}
