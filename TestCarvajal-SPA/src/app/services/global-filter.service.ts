import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { TiposIdentificacionModel } from '../models/tiposidentificacion.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalFilterService {

  usuarioSeleccionado: UsuarioModel;

  tipoDocumentoSeleccionado: TiposIdentificacionModel;

  constructor() { }
}
