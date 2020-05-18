import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposdocumentoComponent } from './tiposdocumento/tiposdocumento.component';
import { JugarComponent } from './jugar/jugar.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { EditarTiposdocumentoComponent } from './tiposdocumento/editar-tiposdocumento/editar-tiposdocumento.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "usuarios", component: UsuariosComponent },
  { path: "tiposdocumento", component: TiposdocumentoComponent },
  { path: "jugar", component: JugarComponent },
  { path:"editar-usuario", component: EditarUsuarioComponent},
  { path:"editar-tiposdocumentos", component: EditarTiposdocumentoComponent},
  { path: "", redirectTo: "/home", pathMatch: "full" }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
