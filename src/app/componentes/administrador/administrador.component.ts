import { Component, OnInit } from '@angular/core';
import { global } from '../../services/global';
import { HttpServicio } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio';
import { Cambios } from '../../models/general';
import { Proyecto } from '../../models/proyecto';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss'],
  providers: [HttpServicio]
})

export class AdministradorComponent implements OnInit {

  //VARIABLES
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg, .mp4",
    maxSize: "500",
    uploadAPI:  {
      url:global.url+'guardar-imagen',
      method: 'POST'
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts:{
      attachPinBtn: 'Imagen'
    }
};
  public seleccion = 'servicio';
  public serv;
  public status;
  public aux;
  public cambios;
  public cambiosGuardados;
  public url;
  public proyecto;

  constructor(
    private servicio: HttpServicio,
    private router: Router
  ) {
    this.serv = new Servicio('','','');
    this.proyecto = new Proyecto('','','');
    this.url = global.url;
    this.cambios = new Cambios ('','','','','','','','','','','','','','');
    
   }

  ngOnInit(): void {
    
    this.traerCambiosGenerales();
  }
  //////////// NUEVO SERVICIO ///////////////////////
  //INICIO SUBIR IMAGEN PARA NUEVO SERVICIO
  subirImagen(datos){
    let imagen = datos.body.imagen;
    this.serv.imagen=imagen;
  }
  //FIN SUBIR IMAGEN PARA NUEVO SERVICIO


  //INICIO ENVIAR FORMULARIO NUEVO SERVICIO
  nuevoServicio(form){
    //Llamar servicio
    this.servicio.nuevoServicio(this.serv).subscribe(
      response => {
        console.log(response);
        this.aux = response;
        if (this.aux.status == 'error') {
          this.status='error';
        }
        this.status='correcto';
        form.reset();
      }, 
      error =>{
        console.log(error);
      }
    );
  }
  //FIN ENVIAR FORMULARIO NUEVO SERVICIO

  ////////// NUEVO PROYECTO /////////////////////
   //INICIO SUBIR IMAGEN PARA NUEVO SERVICIO
   subirImagenp(datos){
    let imagen = datos.body.imagen;
    this.proyecto.imagen=imagen;
  }
  //FIN SUBIR IMAGEN PARA NUEVO SERVICIO

   //INICIO ENVIAR FORMULARIO NUEVO SERVICIO
   nuevoProyecto(form){
    //Llamar servicio
    this.servicio.nuevoProyecto(this.proyecto).subscribe(
      response => {
        console.log(response);
        this.aux = response;
        if (this.aux.status == 'error') {
          this.status='error';
        }
        this.status='correcto';
        form.reset();
      }, 
      error =>{
        console.log(error);
      }
    );
  }
  //FIN ENVIAR FORMULARIO NUEVO SERVICIO

  ////////CAMBIOS GENERALES/////////
  //IINICIO ENVIAR FORMULARIO DE CAMBIOS GENERALES
  cambiosGeneraleas(form){
    this.servicio.actuzalizacionCambios(this.cambios).subscribe(
      response =>{
        this.status = 'correcto';
        console.log(response);
        //Redirección a home
        this.router.navigate(['aministrador']);
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }
  //FIN ENVIAR FORMULARIO DE CAMBIOS GENERALES

  //INICIO SUBIR IMAGENES DE CARRUSEL
  imgcarr1(datos){
    let imagen = datos.body.imagen;
    this.cambios.imgcarr1=imagen;
    console.log(this.cambios.imgcarr1);
  }
  imgcarr2(datos){
    let imagen = datos.body.imagen;
    this.cambios.imgcarr2=imagen;
    console.log(this.cambios.imgcarr2);
  }
  imgcarr3(datos){
    let imagen = datos.body.imagen;
    this.cambios.imgcarr3=imagen;
    console.log(this.cambios.imgcarr3);
  }
  //FIN SUBIR IMAGENES DE CARRUSEL

  //INICIO TRAER CAMBIOS GENERALES
  traerCambiosGenerales(){
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
  //FIN TRAER CAMBIOS GENERALES


  ////////////////////
  
  //Selección del adminitrador
  agregarSercio(){
    this.seleccion = 'servicio';
  }
  ajustesGenerales(){
    this.seleccion = 'generales';
  }
  
  agregarProyecto(){
    this.seleccion = 'proyecto';
  }

}
