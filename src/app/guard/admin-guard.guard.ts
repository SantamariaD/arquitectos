import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpServicio } from '../services/servicio.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(
    private servicio: HttpServicio,
    private router: Router
  ) { }


  canActivate() {
    //Traer información del servicio getIdentity
    let identity = this.servicio.getIdentity();
    
    //Comprobar si el usuario inicio sesión
    if (identity) {
        return true;
    } else {
        this.router.navigate(['/login']);
        return false;
    }
  }

}



