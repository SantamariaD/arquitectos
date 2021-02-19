import { Component, OnInit } from '@angular/core';
import { HttpServicio } from '../../services/servicio.service';
import { Login } from '../../models/login';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpServicio]
})
export class LoginComponent implements OnInit {

  //VARIABLES
  public login: Login;
  public token;
  public identity;
  public status;
  public girar;

  constructor(
    private servicio: HttpServicio,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.login = new Login('', '', '');
  }

  ngOnInit(): void {
    //Efecto de carga Spinner
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    //Se ejecuta siempre y cierra sesión solo cuando se le llega el parametro sure por la url
    this.logout();
  }

  //INICIO METODO DE LOGIN
  enviarlogin(form) {
    this.servicio.loginServicio(this.login).subscribe(
      //Recibir respuesta
      response => {
        //Recibir Token
        if (response.status != 'error') {
          this.token = response;
          console.log(this.token);
          //Recibir información en identity
          this.servicio.loginServicio(this.login, true).subscribe(
            //Recibir respuesta
            response => {
              this.identity = response;
              this.status = 'correcto';

              //Guardar información del usuario en el localstorage para persistir informaición del usuario
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              //Redirección a home
              this.router.navigate(['central']);

            },
            //Recibir error
            error => {
              this.status = 'error';
              console.log(error);
            }
          );
        } else {
          this.status = 'error';
          console.log('Hay un problema en la identificación del usuario.');
        }
      },
      //Recibir error
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }
  //FIN METODO DE LOGIN

  //INICIO CERRAR SESIÓN
  logout() {
    this.route.params.subscribe(
      params => {
        //Recogiendo valor del array params y convirtiendolo a número 1
        let logout = +params['sure'];

        if (logout == 1) {
          //Borrar datos del localstorage y de variables
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity = null;
          this.token = null;
          //Redirección a login
          this.router.navigate(['login']);
        }
      }
    );
  }
  //FIN CERRAR SESIÓN

  //INICIO METODO PARA EL SPINNER
  spin(){
    this.girar = true;
  }
  //FIN METODO PARA EL SPINNER

}
