import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../models/login.model';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  objLogin = new LoginModel();
  nombreUsuario: string;

  constructor(
    private http: HttpClient,    
    private authService: AuthService,
    private route: Router             
  ) {}

  ngOnInit(): void {
  }

  estaLogueado() : boolean {
    return this.authService.estaLogueado();    
  }

  logout() {
     this.authService.logout();
     this.route.navigateByUrl("/");
  }

  login() {
    if (this.objLogin.nroIdentificacion == null) {
      // this.messageService.add({
      //   severity: "warn",
      //   summary: "Login",
      //   detail: "Por favor Ingrese un usuario"
      // });
      return;
    }
    if (this.objLogin.password == null) {
      // this.messageService.add({
      //   severity: "warn",
      //   summary: "Login",
      //   detail: "Por favor Ingrese un password"
      // });
      return;
    }
    this.authService.login(this.objLogin)
      .subscribe(
        response => {
          localStorage.setItem("autkey", response.token);
          const tokenDecode = jwt_decode(response.token);
          this.nombreUsuario = tokenDecode.unique_name;
        },
        error => {
          // this.messageService.add({
          //   severity: "error",
          //   summary: "Error al login",
          //   detail: "Las credenciales ingresadas no son válidas"
          // });
        }
      );
    
  }
  

}



 
