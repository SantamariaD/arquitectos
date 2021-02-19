
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing, appRoutingProviders } from './app.routing';
import { HttpServicio } from './services/servicio.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFileUploaderModule } from "angular-file-uploader";
//FIN IMPORTACIONES GENERALES PARA ANGULAR

//INICIO IMPORTAR GUARDS
import { AdminGuardGuard } from './guard/admin-guard.guard';
//FIN IMPORTAR GUARDS

//INICIO CARGA DE COMPONENTES
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { CentralComponent } from './componentes/central/central.component';
import { BarraNavegacionComponent } from './componentes/barra-navegacion/barra-navegacion.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { LoginComponent } from './componentes/login/login.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { RegistroContactosComponent } from './componentes/registro-contactos/registro-contactos.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';

//FIN CARGA DE COMPONENTES


@NgModule({
  declarations: [
    AppComponent,
    CentralComponent,
    BarraNavegacionComponent,
    FooterComponent,
    NosotrosComponent,
    ServiciosComponent,
    ContactoComponent,
    LoginComponent,
    AdministradorComponent,
    RegistroContactosComponent,
    ProyectosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    NgxSpinnerModule,
  ],
  providers: [
    appRoutingProviders, 
    HttpServicio,
    AdminGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
