import { Injectable } from '@angular/core';
import { JuegoModel } from '../models/juego.Model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  baseUrl: string = "http://localhost:5000/api/Juego/";  
  
  constructor(private http: HttpClient) {}

  play(juegoModel:JuegoModel){
    return this.http.post<JuegoModel>(this.baseUrl + "Jugar", juegoModel );  
  }
}
