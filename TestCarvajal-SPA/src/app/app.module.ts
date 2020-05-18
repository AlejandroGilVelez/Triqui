import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { AuthInterceptorService } from "./interceptor/auth-interceptor.service";
import { HomeComponent } from "./home/home.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { TiposdocumentoComponent } from "./tiposdocumento/tiposdocumento.component";
import { JugarComponent } from "./jugar/jugar.component";
import { EditarUsuarioComponent } from "./usuarios/editar-usuario/editar-usuario.component";
import { EditarTiposdocumentoComponent } from "./tiposdocumento/editar-tiposdocumento/editar-tiposdocumento.component";


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    UsuariosComponent,
    TiposdocumentoComponent,
    JugarComponent,
    EditarUsuarioComponent,
    EditarTiposdocumentoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
    ButtonModule,
    TableModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
