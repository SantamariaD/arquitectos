import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto';
import { global } from './global';

@Injectable()
export class HttpServicio{

    //VARIABLES
    public url: string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient
    ){
        this.url= global.url;
    }

    //INICIO GUARDAR CONTACTO
    contactoServicio(contacto): Observable<any>{
        let json= JSON.stringify(contacto);
        let parametros= 'json='+ json;//Parametros a enviar
        let headers= new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');//cabeceras
        return this._http.post(this.url + 'contacto', parametros, {headers: headers});//enviar peticion
    }
    //FIN GUARDAR CONTACTO

    //INICIO BORRAR CONTACTO
    borrarContacto($id){
        return this._http.get(this.url + 'borrar-contactos/'+ $id);
    }
    //FIN BORRAR CONTACTO

    //INICIO TRAER TODOS LOS CONTACTOS
    traerContactos(): Observable<any>{
        return this._http.get(this.url + 'traer-contactos');
    }
    //FIN TRAER TODOS LOS CONTACTOS

    //INICIO SERVICIO PARA LOGUEAR
    loginServicio(login, gettoken = null): Observable<any>{
        if(gettoken != null){
            login.gettoken = true;
        }
        //login se convirte a json 
        let json = JSON.stringify(login);
        //Se preparan parametros a enviar
        let parametros = 'json='+json;
        //Cabeceras
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        //Enviar petición por post a api-arquitectos
        return this._http.post(this.url+'login', parametros, {headers: headers});
    }
    //FIN SERVICIO PARA LOGUEAR

    //INICIO SERVICIO PARA NUEVO SERVICIO
    nuevoServicio(servicio){
        //Convertir a json 
        let json = JSON.stringify(servicio);
        //Se preparan los parametros
        let parametros = 'json='+json;
        //Cabecera
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        //Enviar petición por post a api-arquitectos
        return this._http.post(this.url+'guardar-servicio', parametros, {headers: headers});
    }
    //FIN SERVICIO PARA NUEVO SERVICIO

    //INICIO SERVICO PARA TRAER SERVICIOS
    traerServicios(){
        return this._http.get(this.url + 'traer-servicios');
    }
    //FIN SERVICO PARA TRAER SERVICIOS

     //INICIO BORRAR SERVICIO
     borrarServicio($id){
        return this._http.get(this.url + 'borrar-servicio/'+ $id);
    }
    //FIN BORRAR SERVICIO

    //INICIO SERVICIO PARA NUEVO PROYECTO
    nuevoProyecto(proyecto){
        //Convertir a json 
        let json = JSON.stringify(proyecto);
        //Se preparan los parametros
        let parametros = 'json='+json;
        //Cabecera
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        //Enviar petición por post a api-arquitectos
        return this._http.post(this.url+'guardar-proyecto', parametros, {headers: headers});
    }
    //FIN SERVICIO PARA NUEVO PROYECTO

    //INICIO SERVICO PARA TRAER PROYECTOS
    traerProyectos(){
        return this._http.get(this.url + 'traer-proyectos');
    }
    //FIN SERVICO PARA TRAER PROYECTOS

    //INICIO BORRAR SERVICIO
    borrarProyecto($id){
        return this._http.get(this.url + 'borrar-proyecto/'+ $id);
    }
    //FIN BORRAR SERVICIO

    //INICIO SERVICIO PARA TRAER CAMBIOS GENERALES
    traerCambios(){
        return this._http.get(this.url + 'traer-cambios');
    }
    //FIN SERVICIO PARA TRAER CAMBIOS GENERALES

    //INICIO ACTUALIZAR CAMBIOS
    actuzalizacionCambios(cambios){
         //login se convirte a json 
         let json = JSON.stringify(cambios);
         //Se preparan parametros a enviar
         let parametros = 'json='+json;
         //Cabeceras
         let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
         //Enviar petición por post a api-arquitectos
         return this._http.post(this.url+'actualizar-cambios', parametros, {headers: headers});
    }
    //FIN ACTUALIZAR CAMBIOS

    //INICIO GETIDENTITY
    getIdentity(){
        //Guardar en variable la informaciónn de identity del localstorage
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity && identity != 'undefined'){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }
    //FIN GETIDENTITY

    //INICIO RECOGER TOKEN DEL LOCALSTORAGE
    getToken(){
        //Guardar en variable la informaciónn de token del localstorage
        let token = JSON.parse(localStorage.getItem('token'));
        if(token && token != 'undefined'){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }
    //FIN RECOGER TOKEN DEL LOCALSTORAGE
}