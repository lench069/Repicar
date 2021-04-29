import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { Camera } from '@ionic-native/camera/ngx'; //para la camara

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public nombres: string = '';
  public apellidos: string = '';
  public celular: string = '';
  public email: string = '';
  public estado: string = 'Activo';
  public contrasenia: string = '';
  public imagen: any = '../../../assets/imagenes/avatar.jpg';

  constructor(public servicio:ServiciosService,
    private camera:Camera //para usar la camara.
    ) { }

  ngOnInit() {
  }

  Guardar (){
    if(this.nombres == '')
    {
      this.servicio.Mensajes('Debe ingresar sus nombres.', 'dark');
    }else if(this.apellidos == '')
    {
      this.servicio.Mensajes('Debe ingresar sus apellidos.', 'dark');
    }else if(this.celular == '')
    {
      this.servicio.Mensajes('Debe ingresar un numero de celular.', 'dark');
    }else if(this.email == '') 
    {
      this.servicio.Mensajes('Debe ingresar un email.', 'dark');
    }else if(this.contrasenia == '')
    {
      this.servicio.Mensajes('Debe ingresar una contraseña.', 'dark');
    }else{
      this.servicio.Cliente_Guardar({
        nombres:this.nombres,
        apellidos:this.apellidos,
        celular:this.celular,
        email:this.email,
        contrasenia:this.contrasenia,
        estado:this.estado,
        imagen: this.imagen
      }).subscribe((data:any)=>{
        console.log();
        this.servicio.Mensajes(data.mensaje,data.info.id_cliente == 0 ? 'danger' : 'success');
        this.servicio.irA('/login');
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
      });

    } 
    
  }

  Capturar_foto()
  {
    this.camera.getPicture({quality: 60,
      allowEdit:true, //permite editar la imgen 
      targetHeight:800, //ancho
      targetWidth:800, //alto
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
     this.imagen = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
       this.servicio.Mensajes('No se capturo ninguna imagen','danger');
    });
  };

}
