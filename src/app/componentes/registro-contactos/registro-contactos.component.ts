import { Component, OnInit, DoCheck } from '@angular/core';
import swal from 'sweetalert';
import { HttpServicio } from '../../services/servicio.service';

@Component({
  selector: 'app-registro-contactos',
  templateUrl: './registro-contactos.component.html',
  styleUrls: ['./registro-contactos.component.scss'],
  providers: [HttpServicio]
})
export class RegistroContactosComponent implements OnInit {

  //VARIABLES
  public contactos;
  public status;
  public respuesta;
  public promesa;

  constructor(
    private servicio: HttpServicio
  ) { }

  ngOnInit(): void {
    this.traer();
  }

  //INICIO MANDAR A SERVICIO PETICIÓN DE TRAER CONTACTOS
  traer() {
    this.servicio.traerContactos().subscribe(
      response => {
        //Recibir datos de la response
        this.contactos = response;
        console.log(this.contactos);
      },
      //Recibir error
      error => {
        console.log(error);
      }
    );
  }
  //FIN MANDAR A SERVICIO PETICIÓN DE TRAER CONTACTOS

  //INICIO MANDAR PETICION A SERCICIO borrarContacto 
  borrar(id) {
    this.servicio.borrarContacto(id).subscribe(
      response => {
        //Recibir respuesta
        this.respuesta = response;
        this.status = this.respuesta.status;
        //Actualizar tabla de contactos
        this.traer();
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
    swal("¿Estas segura de borrar el contacto?", {
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
