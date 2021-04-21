import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { Camera } from '@ionic-native/camera/ngx'; //para la camara

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  public id:number = 4;
  public nombres: string = '';
  public apellidos: string = '';
  public celular: string = '';
  public email: string = '';
  public estado: string = '';
  public contrasenia: string = '';
  public imagen:any = null;
  public flag:boolean = false;

  constructor(public servicio:ServiciosService,
    private camera:Camera //para usar la camara.
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    
    if(this.id != 0)
    {
      this.servicio.Cliente_consultar(this.id)
      .subscribe((data:any)=>{
        console.log(data);
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.info.item.ID_CLIENTE > 0)
        {
          console.log(data.info.item);
          this.nombres = data.info.item.NOMBRES;
          this.apellidos = data.info.item.APELLIDOS;
          this.email = data.info.item.EMAIL;
          this.celular = data.info.item.CELULAR;
          this.contrasenia = data.info.item.CONTRASENIA;
          this.estado = data.info.item.ESTADO;
          this.imagen = data.info.item.FOTO;
        }else{
          this.servicio.Mensajes('El cliente que desea consultar no existe.','danger');
          this.servicio.irA('/login');
        }
        
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
          this.servicio.irA('/login');
      });
    }
  }

  Actualizar (){
    
    if (this.flag == false)
    {
      this.imagen = 'false';
    }
    if(this.nombres == '')
    {
      this.servicio.Mensajes('Debe ingresar sus nombres.', 'warning');
    }else if(this.apellidos == '')
    {
      this.servicio.Mensajes('Debe ingresar sus apellidos.', 'warning');
    }else{
      this.servicio.Cliente_Actualizar_Cuenta({
        id_cliente:this.id,
        nombres:this.nombres,
        apellidos:this.apellidos,
        imagen: this.imagen
      }).subscribe((data:any)=>{
        this.servicio.Mensajes(data.mensaje,data.info.id == 0 ? 'danger' : 'success');
        this.servicio.irA('/inicio');
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
      });

    } 
    
  };
  Capturar_foto()
  {
    this.flag = true;
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
