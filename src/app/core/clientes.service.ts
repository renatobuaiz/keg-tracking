import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Cliente } from '../shared/models/cliente';

const url = 'http://localhost:3000/cliente/';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  constructor(private http: HttpClient) {}

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(url, cliente);
  }

  editar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(url + cliente.id, cliente);
  }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(url);
  }

  visualizar(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

}
