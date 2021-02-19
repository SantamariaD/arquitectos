import { Component, OnInit } from '@angular/core';
import { global } from '../../services/global';
import { HttpServicio } from '../../services/servicio.service';
import { Cambios } from '../../models/general';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [HttpServicio]
})
export class FooterComponent implements OnInit {

  //VARIABLES
  public cambios;
  public cambiosGuardados;
  public url;

  constructor(
    private servicio: HttpServicio
  ) {
    this.url = global.url;
    this.cambios = new Cambios ('','','','','','','','','','','','','','');
   }

  ngOnInit(): void {
    this.traerCambiosGuardados();
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
