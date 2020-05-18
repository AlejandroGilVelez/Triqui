import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { Router } from "@angular/router";
import { GlobalFilterService } from '../services/global-filter.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  registros: Array<UsuarioModel> = [];
  usuarioSeleccionado: UsuarioModel;

  constructor(
    private usuarioService: UsuarioService,
    private route: Router,
    private globalFilterService: GlobalFilterService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers(){
    this.usuarioService.getList().subscribe(
      (result) => {
        this.registros = [...result];
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar lista de usuarios"
        });              
      }
    )
  }

  agregarUsuario(){
    // localStorage.removeItem("idUsuarioEditar");
    this.globalFilterService.usuarioSeleccionado = null;
    this.route.navigate(["/editar-usuario"]);
  }

  editar(row: UsuarioModel){
    // localStorage.setItem("idUsuarioEditar",row.id);
    this.globalFilterService.usuarioSeleccionado = row;
    this.route.navigate(["/editar-usuario"]);
  }

  eliminar(row: UsuarioModel){
    this.usuarioSeleccionado = row;
    this.messageService.clear();
      this.messageService.add({
        key: "c",
        sticky: true,
        severity: "warn",
        summary: "Eliminar el Usuario?",
        detail: "Esta seguro que desea eliminar el usuario"
      });
  }
  onConfirm(){
    this.usuarioService.delete(this.usuarioSeleccionado.id).subscribe(
      (result) => {
        this.onReject()
        this.getUsers();
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al guardar",
          detail: "Ocurrió un error al momento de guardar"
        });
      });
  }
  onReject(){
    this.messageService.clear("c");
  }

}
