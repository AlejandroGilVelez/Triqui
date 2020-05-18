import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TiposidentificacionService } from "../../services/tiposidentificacion.service";
import { TiposIdentificacionModel } from "../../models/tiposidentificacion.model";
import { GlobalFilterService } from "../../services/global-filter.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-editar-tiposdocumento",
  templateUrl: "./editar-tiposdocumento.component.html",
  styleUrls: ["./editar-tiposdocumento.component.css"],
})
export class EditarTiposdocumentoComponent implements OnInit {
  tipoDocumentoSeleccionado: TiposIdentificacionModel;
  esNuevoTipoDocumento: boolean;

  constructor(
    private route: Router,
    private tiposidentificacionService: TiposidentificacionService,
    private globalFilterService: GlobalFilterService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.esNuevoTipoDocumento = true;
    this.tipoDocumentoSeleccionado = new TiposIdentificacionModel();

    // const idTipoDocumento = localStorage.getItem("idTipoDocumentoEditar");
    this.tipoDocumentoSeleccionado = this.globalFilterService.tipoDocumentoSeleccionado;

    if (this.tipoDocumentoSeleccionado != null) {
      // Editando
      this.tipoDocumentoEditar(this.tipoDocumentoSeleccionado.id);
      this.esNuevoTipoDocumento = false;
    } else {
      this.tipoDocumentoSeleccionado = new TiposIdentificacionModel();
    }
  }

  tipoDocumentoEditar(id: string) {
    this.tiposidentificacionService.get(id).subscribe(
      (result) => {
        this.tipoDocumentoSeleccionado = result;
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error al cargar",
          detail: "Ocurrió un error al momento de cargar el tipo de documento",
        });
      }
    );
  }

  guardar() {
    if (!this.validaciones()) {
      return;
    }
    if (this.esNuevoTipoDocumento) {
      this.tiposidentificacionService
        .crear(this.tipoDocumentoSeleccionado)
        .subscribe(
          (result) => {
            this.messageService.add({
              severity: "success",
              summary: "Guadado exitoso",
              detail: "El tipo de documento se creo correctamente",
            });
            this.route.navigate(["/tiposdocumento"]);
          },
          (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error al guardar",
              detail:
                "Ocurrió un error al momento de guardar el tipo de documento",
            });
          }
        );
    } else {
      this.tiposidentificacionService
        .editar(this.tipoDocumentoSeleccionado)
        .subscribe(
          (result) => {
            this.messageService.add({
              severity: "success",
              summary: "Guadado exitoso",
              detail: "El tipo de documento se edito correctamente",
            });
            this.route.navigate(["/tiposdocumento"]);
          },
          (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error al guardar",
              detail:
                "Ocurrió un error al momento de editar el tipo de documento",
            });
          }
        );
    }
  }

  cancelar() {
    // Redirecciona a pagina tipos de documentos.
    this.route.navigate(["/tiposdocumento"]);
  }

  validaciones(): boolean {
    if (
      this.tipoDocumentoSeleccionado.nombre == null ||
      this.tipoDocumentoSeleccionado.nombre.length == 0
    ) {
      this.messageService.add({
        severity: "warn",
        summary: "Nombre Inválido",
        detail: "Digite un nombre",
      });      
      return false;
    }
    if (
      this.tipoDocumentoSeleccionado.descripcion == null ||
      this.tipoDocumentoSeleccionado.descripcion.length == 0
    ) {
      this.messageService.add({
        severity: "warn",
        summary: "Descripción Inválido",
        detail: "Digite una Descripción",
      });            
      return false;
    }
    return true;
  }
}
