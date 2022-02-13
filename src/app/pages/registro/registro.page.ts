import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx'; //para la camara
import { LoadingController } from '@ionic/angular';
//device
import { Device } from '@awesome-cordova-plugins/device/ngx';

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
  forma: FormGroup;

  constructor(public servicio:ServiciosService,
    private fb: FormBuilder,
    public loading: LoadingController,
    private camera:Camera, //para usar la camara.
    private device: Device
    ) { console.log('Device UUID is: ' + this.device.uuid);}

  ngOnInit() {
    this.crearFormulario();
  }
  get nombresNoValido() {
    return this.forma.get('nombres').invalid && this.forma.get('nombres').touched
  }
  get apellidosNoValido() {
    return this.forma.get('apellidos').invalid && this.forma.get('apellidos').touched
  }
  get celularNoValido() {
    return this.forma.get('celular').invalid && this.forma.get('celular').touched
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get contraseniaNoValido() {
    return this.forma.get('contrasenia').invalid && this.forma.get('contrasenia').touched
  }

  crearFormulario() {

    this.forma = this.fb.group({
      nombres  : ['', [ Validators.required, Validators.minLength(3) ]  ],
      apellidos  : ['', [ Validators.required, Validators.minLength(3) ]  ],
      celular: ['', [Validators.required, Validators.minLength(10),Validators.pattern('[-+]?([0-9]*\.[0-9]+|[0-9]+)') ] ],  
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      contrasenia: ['', [Validators.required, Validators.minLength(4) ] ]
    
    });

  }

  async Guardar (){
    console.log( this.forma );

    if ( this.forma.invalid ) {
      console.log('invalido');
      return Object.values( this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
        
      });
     
    }else{
      let l = await this.loading.create(); 
      l.present();
      this.servicio.Cliente_Guardar({
        nombres:this.forma.value.nombres,
        apellidos:this.forma.value.apellidos,
        celular:this.forma.value.celular,
        email:this.forma.value.correo,
        contrasenia:this.forma.value.contrasenia,
        estado:this.estado,
        imagen: this.imagen,
        token: '',
        uidd: this.device.uuid,
        login: '0' //true
      }).subscribe((data:any)=>{
        console.log();
        this.servicio.Mensajes(data.mensaje,data.info.id_cliente == 0 ? 'danger' : 'success');
        l.dismiss();
        this.servicio.irA('/login');
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
          l.dismiss();
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
