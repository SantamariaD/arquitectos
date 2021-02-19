//INICIO IMPORTAR LOS MODULOS DEL ROUTER DE ANGULAR
import { ModuleWithProviders } from '@angular/core';
import { Routes,  RouterModule } from '@angular/router';
//FIN IMPORTAR LOS MODULOS DEL ROUTER DE ANGULAR

//INICIO IMPORTAR GUARDS
import { AdminGuardGuard } from './guard/admin-guard.guard';
//FIN IMPORTAR GUARDS

//INICIO IMPORTAR COMPONENTES
import { CentralComponent } from './componentes/central/central.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { LoginComponent } from './componentes/login/login.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { RegistroContactosComponent } from './componentes/registro-contactos/registro-contactos.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
//FIN IMPORTAR COMPONENTES


//INICI0 RUTAS
const appRoutes: Routes = [
    {path: '', component: CentralComponent},
    {path: 'administrador', component: AdministradorComponent, canActivate: [AdminGuardGuard]},
    {path: 'central', component: CentralComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'nosotros', component: NosotrosComponent},
    {path: 'registro-contactos', component: RegistroContactosComponent, canActivate: [AdminGuardGuard]},
    {path: 'servicios', component: ServiciosComponent},
    {path: 'proyectos', component: ProyectosComponent}
    
];
//FIN RUTAS

//INICIO EXPORTAR MODULO DE RUTAS
export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
//FIN EXPORTAR MODULO DE RUTAS