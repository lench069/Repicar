import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { Camera } from '@ionic-native/camera/ngx'; //para la camara
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-newpedido',
  templateUrl: './newpedido.page.html',
  styleUrls: ['./newpedido.page.scss'],
})
export class NewpedidoPage implements OnInit {

  public id_pais:number = 1;
  public id_provincia:number = 0;
  public id_ciudad:number = 0;
  public tipov:string = '';
  public marca:string = '';
  public modelo:string = '';
  public anioselect:string='';
  public descripcion:string='';
  public estado:string='Creado';
  public fecha_ini:string='2021-04-16';
  public fecha_fin:string='';
  public nombres_fac:string='';
  public apellidos_fac:string="";
  public email_fac:string='';
  public telefono_fac:string='';
  public ci_fac:string='';
  public direccion_fac:string='';
  public cprincipal:string = '';
  public csecundaria:string='';
  public telefono_env:string='';
  public referencia:string='';
  public provincias:[] = [];
  public ciudades:[] = [];
  public tipo_vehiculos:[] = [];
  public marcas:[] = [];
  public modelos:[] = [];
  public anios:any = [];
  public chfac:boolean= false;
  public chservi:boolean=false;
  public chgenerico:boolean= false;
  public choriginal:boolean=false;
  public imagen:string [] = [];
  public id_cliente:number = 0;
 

  constructor(public servicio:ServiciosService,
    private camera:Camera, //para usar la camara.
    private storage: Storage
    ) { 
    
  }

  ngOnInit() {
  }

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
  
    this.storage.create();
    let usuario = await this.storage.get('session_storage');
    this.id_cliente = usuario.ID_CLIENTE;
    if(this.id_pais != 0)
    {
      this.servicio.Provincias_por_pais(this.id_pais)
      .subscribe((data:any)=>{
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.info.items.length > 0)
        {
          this.provincias = data.info.items;
        }else{
          this.servicio.Mensajes('El pais seleccionado no tiene provincias asociadas.','danger');
        }
        
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
      });
    }
    this.Cargar_Tipo_Vehiculo();
    this.Cargar_Años();
  
  }

  Cargar_Ciudades(id_provincia:number)
  {
    this.ciudades = [];
    this.id_provincia = id_provincia;
    if(this.id_provincia != 0)
    {
      this.servicio.Ciudades_por_provincia(this.id_provincia)
      .subscribe((data:any)=>{
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.info.items.length > 0)
        {
          this.ciudades = data.info.items;
        }else{
          this.servicio.Mensajes('La provincia seleccionada no tiene ciudades asociadas.','danger');
        }
        
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
      });
    }

  };
  Cargar_Tipo_Vehiculo()
  {
      this.servicio.Tipo_vehiculo()
      .subscribe((data:any)=>{
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
      console.log(data);
        if(data.info.items.length > 0)
        {
          this.tipo_vehiculos = data.info.items;
        }else{
          this.servicio.Mensajes('No existen Tipo de Vehiculos.','danger');
        }
        
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
      });
  };

  /*Cargar_Marcas(id_tipov:number)
  {
    this.id_tipov = id_tipov;
    if(this.id_tipov != 0)
    {
      this.servicio.Marcas_Tipov(this.id_tipov)
      .subscribe((data:any)=>{
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.info.items.length > 0)
        {
          this.marcas = data.info.items;
        }else{
          this.servicio.Mensajes('El tipo de vehiculo seleccionado no tiene marcas asociadas.','danger');
        }
        
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
      });
    }

  };*/

 /* Cargar_Modelos(id_marca:number)
  {
    
    this.id_marca = id_marca;
    if(this.id_marca != 0)
    {
      this.servicio.Modelo_Marca(this.id_marca)
      .subscribe((data:any)=>{
        console.log(data);
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.info.items.length > 0)
        {
          this.modelos = data.info.items;
        }else{
          this.servicio.Mensajes('La marca seleccionado no tiene modelos asociados.','danger');
        }
        
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
      });
    }else{
      
      this.servicio.Mensajes('Debe seleccionar una marca primero.','danger');
    }

  };*/
  Cargar_Años()
  {
      let anio_actual = new Date().getFullYear() +1;
      const anio_min = 1960;
      for (let i = anio_actual; i >= anio_min; i--) {
          this.anios.push({valor: i.toString()});
      }   
  };

  Guardar (){
   

    if(this.id_provincia == 0)
    {
      this.servicio.Mensajes('Debe seleccionar una provincia.', 'warning');
    }else if(this.id_ciudad == 0)
    {
      this.servicio.Mensajes('Debe Seleccionar una ciudad.', 'warning');
    }else if(this.tipov == '')
    {
      this.servicio.Mensajes('Debe seleccionar un tipo de vehiculo.', 'warning');
    }else if(this.marca == '')
    {
      this.servicio.Mensajes('Debe seleccionar una marca.', 'warning');
    }else if(this.modelo == '' )
    {
      this.servicio.Mensajes('Debe seleccionar un modelo.', 'warning');
    }else if(this.anioselect == '')
    {
      this.servicio.Mensajes('Debe seleccionar un año.', 'warning');
    }else if(this.descripcion == '')
    {
      this.servicio.Mensajes('Debe ingresar una descripcion del pedido.', 'warning');
    }else if(this.chgenerico == false && this.choriginal == false)  
    {
      this.servicio.Mensajes('Debe seleccionar genrico u original.', 'warning');
    }

    else if (this.chfac == true)
    {
            console.log('aa')
            if(this.nombres_fac == '')
            {
              this.servicio.Mensajes('Debe ingresar un nombre para la factura.', 'warning');
            }else if(this.ci_fac == '')
            {
              this.servicio.Mensajes('Debe ingresar una cedula para la factura.', 'warning');
            }else if(this.telefono_fac == '')
            {
              this.servicio.Mensajes('Debe ingresar un telefono para la factura.', 'warning');
            }else if(this.direccion_fac == '')
            {
              this.servicio.Mensajes('Debe ingresar un direccion para la factura.', 'warning');
            }else if(this.email_fac == '')
            {
              this.servicio.Mensajes('Debe ingresar un correo para la factura.', 'warning');
            }
            
            else if (this.chservi == true)
          {
            console.log('bb');
            if(this.cprincipal == '')
            {
              this.servicio.Mensajes('Debe ingresar una calle principal.', 'warning');
            }else if(this.csecundaria == '')
            {
              this.servicio.Mensajes('Debe ingresar una calle secundaria', 'warning');
            }else if(this.telefono_env == '')
            {
              this.servicio.Mensajes('Debe ingresar un telefono para el envio', 'warning');
            }else if(this.referencia == '')
            {
              this.servicio.Mensajes('Debe ingresar una referencia para el envio', 'warning');
            }else{
              this.Guaradr_service();
            }
          }else 
            {
              this.Guaradr_service();
            }
    }
    else if (this.chservi == true)
    {       
            console.log('bb');
            if(this.cprincipal == '')
            {
              this.servicio.Mensajes('Debe ingresar una calle principal.', 'warning');
            }else if(this.csecundaria == '')
            {
              this.servicio.Mensajes('Debe ingresar una calle secundaria', 'warning');
            }else if(this.telefono_env == '')
            {
              this.servicio.Mensajes('Debe ingresar un telefono para el envio', 'warning');
            }else if(this.referencia == '')
            {
              this.servicio.Mensajes('Debe ingresar una referencia para el envio', 'warning');
            }else{
              this.Guaradr_service();
            }
             
    }else 
    {
      console.log('solo');
      this.Guaradr_service();
    }
    
  

   //****************** 
  };

  Guaradr_service()
  {
    this.servicio.Pedido_Guardar({
      cod_pedido:this.Generar_codigo (),
      id_cliente:this.id_cliente,
      id_ciudad:this.id_ciudad,
      tipo_vehiculo:this.tipov,
      marca:this.marca,
      modelo:this.modelo,
      anio: this.anioselect,
      descripcion: this.descripcion,
      original: this.choriginal == true ? "Original" : "",
      generico: this.chgenerico == true ? "Generico" : "",
      factura: this.chfac,
      servicio_env: this.chservi,
      estado: this.estado,
      fecha_ini: this.fecha_ini,
      fecha_fin: this.fecha_fin,
      //factura
      nombres:this.nombres_fac,
      email:this.email_fac,
      telefono:this.telefono_fac,
      ci:this.ci_fac,
      direccion:this.direccion_fac,
      //envio
      call_principal:this.cprincipal,
      call_secundaria:this.csecundaria,
      telefono_env:this.telefono_env,
      referencia:this.referencia,
      //fotos
      imagen:this.imagen

    }).subscribe((data:any)=>{
    
      this.servicio.Mensajes(data.mensaje,data.info.id == 0 ? 'danger' : 'success');
      this.servicio.irA('/inicio');
    },(error:any)=>{
        this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
    });
  }

 
  Generar_codigo ():string
  {
    var caracteres = "ABCDEFGHJKMNPQRTUVWXYZ2346789";
       var codigo = "";
       for (let i=0; i<10; i++) codigo +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
       return codigo;
  };

  Capturar_foto()
  {
    console.log(this.imagen.length);
    if(this.imagen.length > 2) 
    {
      this.servicio.Mensajes('Se puede cargar maximo 3 imagenes','warning');
    }else
    {
      this.camera.getPicture({quality: 60,
        allowEdit:true, //permite editar la imgen 
        targetHeight:800, //ancho
        targetWidth:800, //alto
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }).then((imageData) => {
      //this.imagen = 'data:image/jpeg;base64,' + imageData;
  
       this.imagen.push('data:image/jpeg;base64,' + imageData);
       console.log(this.imagen);
  
      }, (err) => {
        console.log(err);
         this.servicio.Mensajes('No se capturo ninguna imagen','danger');
      });
    }
    
  };

  Borrar_foto(index){

    this.imagen.splice(index, 1);


  }

}
