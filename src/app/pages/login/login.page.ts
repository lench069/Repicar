import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { Storage } from '@ionic/Storage';
import { ServiciosService } from 'src/app/servicios.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
  	private storage: Storage,
    public toastCtrl: ToastController,
    private servicio:ServiciosService
  ) { 
    this.storage.create();
    }

  ngOnInit() {
  }

  async prosesLogin(){
    if(this.username == '')
    {
      this.servicio.Mensajes('Ingrese su email.', 'warning');
    }else if(this.password == '')
    {
      this.servicio.Mensajes('Ingrese su contraseña.', 'warning');
    }else
    {
      this.servicio.Login({
        email: this.username,
        contrasenia: this.password
      }).subscribe((data:any)=>{
        console.log(data);
        if(data.mensaje == 'true'){
          this.storage.set('session_storage', data.info.item);
          this.router.navigate(['/inicio']);
          this.servicio.Mensajes('Login Succesfully.', 'success');
          this.username = "";
          this.password = "";
        }else{
          this.servicio.Mensajes(data.mensaje, 'danger');
        }
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
      });

    }

  }

  formRegister(){
  	this.router.navigate(['/registro']);
  }

}

