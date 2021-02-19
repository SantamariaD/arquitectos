import { Component, DoCheck, OnInit } from '@angular/core';
import { global } from '../../services/global';
import { HttpServicio } from '../../services/servicio.service';
import { Cambios } from '../../models/general';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.scss'],
  providers: [HttpServicio]
})
export class BarraNavegacionComponent implements OnInit, DoCheck {

  //VARIABLES
  public identity;
  public token;
  public cambios;
  public cambiosGuardados;
  public url;

  constructor(
    private servicio: HttpServicio
  ) { 
    this.identity = this.servicio.getIdentity();
    this.url = global.url;
    this.cambios = new Cambios ('','','','','','','','','','','','','','');
  }

  ngOnInit(): void {
    this.traerCambiosGuardados();
  }

  //Actualiza los datos del usuario cuando se inicia o cierra sesión
  ngDoCheck(): any{
    this.identity = this.servicio.getIdentity();
  }

  traerCambiosGuardados(){
    this.servicio.traerCambios(). subscribe(
      response => {
        this.cambiosGuardados = response;
        this.cambios = this.cambiosGuardados[0];

      },
      error =>{
        console.log(error)
      }
    );
  }

}
