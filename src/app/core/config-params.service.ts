import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigParams): HttpParams {
    let httpParams = new HttpParams();
    if(config.pagina) {
      httpParams = httpParams.set('_page', config.pagina.toString());
    };
    if(config.limite) {
      httpParams = httpParams.set('_limit', config.limite.toString());
    }
    if (config.pesquisa) {
      httpParams = httpParams.set('q', config.pesquisa);
    }
    if (config.campo) {
      if(config.campo.valor !== '') {
        httpParams = httpParams.set(config.campo.nome, config.campo.valor.toString());
      } else {
        httpParams = httpParams.delete(config.campo.nome);
      }
    }
    httpParams = httpParams.set('_sort', 'titulo');
    httpParams = httpParams.set('_order', 'asc');

    return httpParams;
  }
}
