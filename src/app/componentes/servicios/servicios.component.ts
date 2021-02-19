import { Component, OnInit } from '@angular/core';
import { HttpServicio } from '../../services/servicio.service';
import { global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [HttpServicio]
})
export class ServiciosComponent implements OnInit {
  //VARIABLES
  public servicios;
  public url;
  public status;
  public respuesta;
  public identity;

  constructor(
    private servicio: HttpServicio
  ) {
    this.url = global.url;
    this.identity = this.servicio.getIdentity();
   }

  ngOnInit(): void {
    this.traerServicios();
  }

  //INICIO TRAER TODOS LOS SERVICIOS
  traerServicios(){
    this.servicio.traerServicios().subscribe(
      response =>{
        this.servicios = response;
        console.log(this.servicios);
      },
      error => {
        console.log(error)
      }
    );
  }
  //INICIO TRAER TODOS LOS SERVICIOS

   //INICIO MANDAR PETICION A SERCICIO borrarContacto 
   borrar(id) {
    this.servicio.borrarServicio(id).subscribe(
      response => {
        //Recibir respuesta
        this.respuesta = response;
        this.status = this.respuesta.status;
        //Actualizar Servicios
        this.traerServicios();
      },
      error => {
        //Recibir error
        this.status = error;
      }
    );
  }
  //FIN MANDAR PETICION A SERCICIO borrarContacto 

  //INICIO METODO PARA ALERTA DE BORRADO
  mostrarAlerta(id) {
    console.log(id);
    swal("¿Estas segura de borrar el servicio?", {
      icon: "warning",
      //Seleccion de botones
      buttons: ["Cancelar", true],
    }).then((value) => {
      //Comprobar si el boton es true
      if (value) {
        this.borrar(id);
      }
    });
  }
  //FIN METODO PARA ALERTA DE BORRADO

}
