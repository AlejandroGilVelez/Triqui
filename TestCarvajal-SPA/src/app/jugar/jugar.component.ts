import { Component, OnInit } from "@angular/core";
import { JuegoModel } from "../models/juego.model";
import { MessageService } from "primeng/api";
import { JuegoService } from "../services/juego.service";

@Component({
  selector: "app-jugar",
  templateUrl: "./jugar.component.html",
  styleUrls: ["./jugar.component.css"],
})
export class JugarComponent implements OnInit {
  objJugar = new JuegoModel();
  esTurno1: boolean = true;

  constructor(
    private messageService: MessageService,
    private juegoService: JuegoService
    ) {}

  ngOnInit(): void {}

  jugar(campo: string) {
    switch (campo) {
      case "a1": {
        if (!this.validar(this.objJugar.a1)) {
          //mensaje y return
          this.messageService.add({
            severity: "warn",
            summary: "Jugar",
            detail: "Ese campo ya tiene valor",
          });
          return;
        }
        this.objJugar.a1 = this.esTurno1 ? 1 : 2;
        break;
      }
      case "a2": {
        if (!this.validar(this.objJugar.a2)) {
          //mensaje y return
          this.messageService.add({
            severity: "warn",
            summary: "Jugar",
            detail: "Ese campo ya tiene valor",
          });
          return;
        }
        this.objJugar.a2 = this.esTurno1 ? 1 : 2;
        break;
      }
      case "a3": {
        if (!this.validar(this.objJugar.a3)) {
          //mensaje y return
          this.messageService.add({
            severity: "warn",
            summary: "Jugar",
            detail: "Ese campo ya tiene valor",
          });
          return;
        }
        this.objJugar.a3 = this.esTurno1 ? 1 : 2;
        break;
      }
      case "b1": {
        if (!this.validar(this.objJugar.b1)) {
          //mensaje y return
          this.messageService.add({
            severity: "warn",
            summary: "Jugar",
            detail: "Ese campo ya tiene valor",
          });
          return;
        }
        this.objJugar.b1 = this.esTurno1 ? 1 : 2;
        break;
      }
      case "b2": {
        if (!this.validar(this.objJugar.b2)) {
          //mensaje y return
          this.messageService.add({
            severity: "warn",
            summary: "Jugar",
            detail: "Ese campo ya tiene valor",
          });
          return;
        }
        this.objJugar.b2 = this.esTurno1 ? 1 : 2;
        break;
      }
      case "b3": {
        if (!this.validar(this.objJugar.b3)) {
          //mensaje y return
          this.messageService.add({
            severity: "warn",
            summary: "Jugar",
            detail: "Ese campo ya tiene valor",
          });
          return;
        }
        this.objJugar.b3 = this.esTurno1 ? 1 : 2;
        break;
      }
      case "c1": {
        if (!this.validar(this.objJugar.c1)) {
          //mensaje y return
          this.messageService.add({
            severity: "warn",
            summary: "Jugar",
            detail: "Ese campo ya tiene valor",
          });
          return;
        }
        this.objJugar.c1 = this.esTurno1 ? 1 : 2;
        break;
      }
      case "c2": {
        if (!this.validar(this.objJugar.c2)) {
          //mensaje y return
          this.messageService.add({
            severity: "warn",
            summary: "Jugar",
            detail: "Ese campo ya tiene valor",
          });
          return;
        }
        this.objJugar.c2 = this.esTurno1 ? 1 : 2;
        break;
      }
      case "c3": {
        if (!this.validar(this.objJugar.c3)) {
          //mensaje y return
          this.messageService.add({
            severity: "warn",
            summary: "Jugar",
            detail: "Ese campo ya tiene valor",
          });
          return;
        }
        this.objJugar.c3 = this.esTurno1 ? 1 : 2;
        break;
      }
    }
    this.esTurno1 = !this.esTurno1;

    this.juegoService.play(this.objJugar).subscribe(
      (result) => {
        this.objJugar = result;
        if (this.objJugar.ganador.length > 0) {
          this.messageService.add({
            severity: "success",
            summary: "Jugar",
            detail: "El Ganador es: " + this.objJugar.ganador,
          });
          this.objJugar = new JuegoModel();
          this.esTurno1 = true;                    
        }
      },(error) => {
        this.messageService.add({
          severity: "error",
          summary: "Jugar",
          detail: "Ocurrio un error al jugar",
        });
      });
  }

  validar(numero: number): boolean {
    return numero === 0 ? true : false;
  }
}
