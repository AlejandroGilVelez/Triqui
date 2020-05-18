import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {  
  baseUrl: string = "http://localhost:5000/api/Usuario/";  
  
  constructor(private http: HttpClient) {}

  getList(){
    return this.http.get<UsuarioModel[]>(this.baseUrl + "List");  
  }
  delete(id: string){
    return this.http.delete(this.baseUrl + "Delete/" + id);
  } 
  get(id: string){
    return this.http.get<UsuarioModel>(this.baseUrl + "Get/" + id);
  }
  crearUsuario(usuarioModel: UsuarioModel){
    return this.http.post(this.baseUrl + "Create", usuarioModel);
  }
  editar(usuarioModel: UsuarioModel){
    return this.http.put(this.baseUrl + "Update", usuarioModel);
  }  
}
