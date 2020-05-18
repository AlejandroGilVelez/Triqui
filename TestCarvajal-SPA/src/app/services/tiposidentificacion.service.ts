import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiposIdentificacionModel } from '../models/tiposidentificacion.model';

@Injectable({
  providedIn: 'root'
})
export class TiposidentificacionService {
  baseUrl: string = "http://localhost:5000/api/TipoIdentificacions/";  
  
  constructor(private http: HttpClient) {}

  getList(){
    return this.http.get<TiposIdentificacionModel[]>(this.baseUrl + "List");  
  }
  delete(id: string){
    return this.http.delete(this.baseUrl + "Delete/" + id);
  } 
  get(id: string){
    return this.http.get<TiposIdentificacionModel>(this.baseUrl + "Get/" + id);
  }
  crear(tiposIdentificacionModel: TiposIdentificacionModel){
    return this.http.post(this.baseUrl + "Create", tiposIdentificacionModel);
  }
  editar(tiposIdentificacionModel: TiposIdentificacionModel){
    return this.http.put(this.baseUrl + "Update", tiposIdentificacionModel);
  }  

}
