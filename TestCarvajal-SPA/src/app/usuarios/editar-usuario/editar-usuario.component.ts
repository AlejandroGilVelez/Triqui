import { Component, OnInit } from '@angular/core';
import { TiposIdentificacionModel } from '../../models/tiposidentificacion.model';
import { TiposidentificacionService } from '../../services/tiposidentificacion.service';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from "@angular/router";
import { GlobalFilterService } from '../../services/global-filter.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  cargarTiposDocumentosIdentidad: Array<TiposIdentificacionModel> = [];
  usuarioSeleccionado: UsuarioModel;
  esNuevoUsuario: boolean;

  constructor(
    private usuarioService: UsuarioService,    
    private tiposidentificacionService: TiposidentificacionService,
    private route: Router,
    private globalFilterService: GlobalFilterService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getListTy();
    this.esNuevoUsuario = true;
    

    // const idUsuario = localStorage.getItem("idUsuarioEditar");
    this.usuarioSeleccionado = this.globalFilterService.usuarioSeleccionado;



    if(this.usuarioSeleccionado != null){
      // Editando
      this.usuarioEditar(this.usuarioSeleccionado.id);
      this.esNuevoUsuario = false;
    }else{
      this.usuarioSeleccionado = new UsuarioModel();
    }
    
  }

  usuarioEditar(id: string){
    this.usuarioService.get(id).subscribe(
      result => {
        this.usuarioSeleccionado = result;
      },
      error => {
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar el usuario"
        });
      });
  }

  getListTy(){
    this.tiposidentificacionService.getList().subscribe(
      result => {
        this.cargarTiposDocumentosIdentidad = [...result];
      },
      error => {
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar los tipos de documentos"
        });             
      }
    )
  }

  guardar(){
    if(!this.validaciones()){      
      return;
    }

    if(this.esNuevoUsuario){
      this.usuarioService.crearUsuario(this.usuarioSeleccionado).subscribe(
        (result) => {
          this.messageService.add({
            severity: "success",
            summary: "Guadado exitoso",
            detail: "El usuario se creo correctamente"
          });          
          this.route.navigate(["/usuarios"]);
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error al guardar",
            detail: "Ocurrió un error al momento de guardar el usuario"
          });
        }
      );        
    }
    else{
      this.usuarioService.editar(this.usuarioSeleccionado).subscribe(
        result => {
          this.messageService.add({
            severity: "success",
            summary: "Guadado exitoso",
            detail: "El usuario se actualizó correctamente"
          });               
          this.route.navigate(["/usuarios"]);
        },
        error => {
          this.messageService.add({
            severity: "error",
            summary: "Error al guardar",
            detail: "Ocurrió un error al momento de guardar el usuario"
          });
        }
      );
    }
    
  }

  cancelar(){
       // Redireccionar a pagina de usuario.
       this.route.navigate(["/usuarios"]);
  }

  validaciones(): boolean{
    if(this.usuarioSeleccionado.nombres == null || this.usuarioSeleccionado.nombres.length == 0){
      this.messageService.add({
        severity: "warn",
        summary: "Nombre Inválido",
        detail: "Digite un nombre",
      });      
      return false;
    }
    if(this.usuarioSeleccionado.apellidos == null || this.usuarioSeleccionado.apellidos.length == 0){
      this.messageService.add({
        severity: "warn",
        summary: "Apellido Inválido",
        detail: "Digite un apellido",
      });      
      return false;      
    }
    if(this.usuarioSeleccionado.tipoIdentificacionId == null){
      this.messageService.add({
        severity: "warn",
        summary: "Tipo Identificación Inválido",
        detail: "Seleccione un tipo de identificación",
      });      
      return false;      
    }
    if(this.usuarioSeleccionado.nroIdentificacion == null){
      this.messageService.add({
        severity: "warn",
        summary: "Número de Identificación Inválido",
        detail: "Digite un número de identificación",
      });      
      return false;      
    }
    if(this.usuarioSeleccionado.email == null || this.usuarioSeleccionado.email.length == 0){
      this.messageService.add({
        severity: "warn",
        summary: "Email Inválido",
        detail: "Digite un email",
      });      
      return false;      
    }
    if(this.esNuevoUsuario && (this.usuarioSeleccionado.password == null || this.usuarioSeleccionado.password.length == 0)){
      this.messageService.add({
        severity: "warn",
        summary: "Password Inválido",
        detail: "Digite un password",
      });      
      return false;      
    }else if(this.esNuevoUsuario == false && (this.usuarioSeleccionado.password == null || this.usuarioSeleccionado.password.length == 0)){
        return true;      
    }
    return true;
  }

}
