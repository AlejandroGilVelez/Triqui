import { Component, OnInit } from '@angular/core';
import { TiposidentificacionService } from '../services/tiposidentificacion.service';
import { TiposIdentificacionModel } from '../models/tiposidentificacion.model';
import { Router } from '@angular/router';
import { GlobalFilterService } from '../services/global-filter.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tiposdocumento',
  templateUrl: './tiposdocumento.component.html',
  styleUrls: ['./tiposdocumento.component.css']
})
export class TiposdocumentoComponent implements OnInit {

  registrosTiposIdentificacion: Array<TiposIdentificacionModel> = [];
  tipoDocumentoSeleccionado: TiposIdentificacionModel;
  

  constructor(
    private tiposidentificacionService: TiposidentificacionService,
    private route: Router,
    private globalFilterService: GlobalFilterService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getListTypes();
  }

  getListTypes(){
    this.tiposidentificacionService.getList().subscribe(
      (result) => {
        this.registrosTiposIdentificacion = [...result];
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al guardar",
          detail:
            "Ocurrió un error al momento de cargar los tipos de identificación",
        });
      }
    )
  }

  agregarTiposDocumentos(){
    // localStorage.removeItem("idTipoDocumentoEditar");
    this.globalFilterService.tipoDocumentoSeleccionado = null;
    this.route.navigate(["/editar-tiposdocumentos"]);
  }

  editar(row: TiposIdentificacionModel){
    // localStorage.setItem("idTipoDocumentoEditar",row.id);
    this.globalFilterService.tipoDocumentoSeleccionado = row;
    this.route.navigate(["/editar-tiposdocumentos"]);
  }

  eliminar(row: TiposIdentificacionModel){        
      this.tipoDocumentoSeleccionado = row;
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
    this.tiposidentificacionService.delete(this.tipoDocumentoSeleccionado.id).subscribe(
      (result) => {
        this.onReject();
        this.getListTypes();
      },
      (error) => {
        this.onReject();
          this.messageService.add({
            severity: "error",
            summary: "Error al guardar",
            detail: "Ocurrió un error al momento de guardar"
          });
        alert("No se pudo eliminar el regtipo de identificaciónistro");
      });    
  }
  onReject(){
    this.messageService.clear("c");
  }
 

}
