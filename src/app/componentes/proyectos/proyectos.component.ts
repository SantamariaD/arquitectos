import { Component, OnInit } from '@angular/core';
import { HttpServicio } from '../../services/servicio.service';
import { global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
  providers: [HttpServicio]
})
export class ProyectosComponent implements OnInit {
   //VARIABLES
   public proyectos;
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
    this.traerProy();
  }

  //INICIO TRAER TODOS LOS SERVICIOS
  traerProy(){
    this.servicio.traerProyectos().subscribe(
      response =>{
        this.proyectos = response;
        console.log(this.proyectos);
      },
      error => {
        console.log(error)
      }
    );
  }
  //INICIO TRAER TODOS LOS SERVICIOS

  //INICIO MANDAR PETICION A SERCICIO borrarContacto 
  borrar(id) {
    this.servicio.borrarProyecto(id).subscribe(
      response => {
        //Recibir respuesta
        this.respuesta = response;
        this.status = this.respuesta.status;
        //Actualizar Servicios
        this.traerProy();
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
    swal("¿Estas segura de borrar el proyecto?", {
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
