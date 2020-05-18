import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import { TokenModel } from "../models/token.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl: string = "http://localhost:5000/api/Autenticacion/";  

  constructor(private http: HttpClient) {}

  login(objLogin: LoginModel) {
    return this.http.post<TokenModel>(this.baseUrl, objLogin);
  }

  estaLogueado(): boolean{
    return localStorage.getItem("autkey")!= null && localStorage.getItem("autkey").length > 1;
  }

  logout(){
    localStorage.removeItem("autkey");
  }

}

