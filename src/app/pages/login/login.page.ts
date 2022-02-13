import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
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
    private servicio:ServiciosService,
    public loading: LoadingController
  ) { 
    this.storage.create();
    }

  ngOnInit() {
  }

  async prosesLogin(){
    let l = await this.loading.create(); //se crea el loading
    l.present(); //se muestra el loading
    if(this.username == '')
    {
      this.servicio.Mensajes('Ingrese su email.', 'warning');
      l.dismiss();//quita el loading una vez cargue todo
    }else if(this.password == '')
    {
      this.servicio.Mensajes('Ingrese su contraseña.', 'warning');
      l.dismiss();//quita el loading una vez cargue todo
    }else
    {
      this.servicio.Login({
        email: this.username,
        contrasenia: this.password
      }).subscribe((data:any)=>{
        console.log(data);
        if(data.mensaje == 'true'){

          this.servicio.Cliente_Actualizar_Login(
            data.info.item.ID_CLIENTE,
            '0'
          ).subscribe((data:any)=>{
             console.log(data);
          },(error:any)=>{
              this.servicio.Mensajes('No se pudo realizar la peticion, compruebe su conexion a internet.','danger');
              l.dismiss();//quita el loading una vez cargue todo
          });


          this.storage.set('session_storage', data.info.item);
          l.dismiss();//quita el loading una vez cargue todo
          this.router.navigate(['/inicio']);
          this.servicio.Mensajes('Login Succesfully.', 'success');
          this.username = "";
          this.password = "";
        }else{
          this.servicio.Mensajes(data.mensaje, 'danger');
          l.dismiss();//quita el loading una vez cargue todo
        }
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion, compruebe su conexion a internet.','danger');
          l.dismiss();//quita el loading una vez cargue todo
      });

    }

  }

  formRegister(){
  	this.router.navigate(['/registro']);
  }

}

