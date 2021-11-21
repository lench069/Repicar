import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//PUSH
import { Push, PushObject  } from '@ionic-native/push/ngx';
import { ToastController } from '@ionic/angular';
import { AdmobService } from './services/admob.service';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  //URL del servidor
  //private URL_API: string = 'http://riobytes.com/api_repicar/'; 
  private URL_API: string = 'http://192.168.100.19:8080/api_repicar/'; 

  constructor(private router: Router,
    private http: HttpClient,
    private toast: ToastController,
    private admobService: AdmobService,
    private push: Push
    ) { }

  irA (url:string)
  {
    this.router.navigateByUrl(url);
  }

  //permite mostrar mesajes al momento de utilizar los servicios, al usar el toast se debe definir la funcion como asycn.
  async Mensajes (texto:string, tipo:string = 'success'){
    let t = await this.toast.create({
      //header: 'Toast header',
      message: texto,
      color: tipo,
      duration: 2000
    });
    t.present();

  }
    //***********************Login******************************************/
    Login(data:any) {
      return this.http.post(
        this.URL_API + 'login-cliente', 
        this.objectToFormData({
          email: data.email,
          contrasenia: data.contrasenia,
        }) 
        );
    }

    //***********************INICIO************* */

    total_pedidos(data:any) {
      return this.http.post(
        this.URL_API + 'total-pedidos', 
        this.objectToFormData({
          id_cliente: data.id_cliente,
        }) 
        );
    }


  //***********************CLIENTES INICIO******************************************/
  Cliente_Guardar(data:any) {
    console.log(data);
    return this.http.post(
      this.URL_API + 'registrar-cliente', 
      this.objectToFormData({
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        celular: data.celular,
        contrasenia: data.contrasenia,
        estado: data.estado,
        foto: data.imagen
      }) 
      );
  };
  Cliente_consultar(id:number) {
    return this.http.get(
      this.URL_API + 'consultar-cliente/'+id , 
      );
  };
  Cliente_Actualizar_Cuenta(data:any) {
    return this.http.post(
      this.URL_API + 'actualizar-cuenta/'+data.id_cliente, 
      this.objectToFormData({
        nombres: data.nombres,
        apellidos: data.apellidos,
        foto:data.imagen

      }) 
      );
  };

  //***********************PROVINCIA INICIO******************************************/
  Provincias_por_pais(id_pais:number) {
    return this.http.get(
      this.URL_API + 'provincias-pais/'+id_pais , 
      );
  };
    //***********************CIUDAD INICIO******************************************/
    Ciudades_por_provincia(id_ciudad:number) {
      return this.http.get(
        this.URL_API + 'ciudades-provincia/'+id_ciudad, 
        );
    };
      //***********************TIPO VEHICULO INICIO******************************************/
      Tipo_vehiculo() {
        return this.http.get(
          this.URL_API + 'listado-tipo-vehiculo' 
          );
      };
       //***********************MARCA INICIO******************************************/
       Marcas_Tipov(id_tipov:number) {
      return this.http.get(
        this.URL_API + 'marcas-tipov/'+id_tipov, 
        );
    };
        //***********************MODELO INICIO******************************************/
        Modelo_Marca(id_marca:number) {
          return this.http.get(
            this.URL_API + 'modelo-marca/'+id_marca, 
            );
        };

        //***********************PEDIDOS INICIO******************************************/
        Pedido_Guardar(data:any) {
          console.log(data);
        return this.http.post(
          this.URL_API + 'registrar-pedido', 
          this.objectToFormData({
            cod_pedido:data.cod_pedido,
            id_cliente:data.id_cliente,
            id_ciudad:data.id_ciudad,
            tipo_vehiculo:data.tipo_vehiculo,
            marca:data.marca,
            modelo:data.modelo,
            anio: data.anio,
            descripcion: data.descripcion,
            original: data.original,
            generico: data.generico,
            factura: data.factura == false ? "0" : "1",
            servicio_env: data.servicio_env == false ? "0" : "1",
            estado: data.estado,
            fecha_ini: data.fecha_ini,
            fecha_fin: data.fecha_fin,
            //factura
            nombres:data.nombres,
            email:data.email,
            telefono:data.telefono,
            ci:data.ci,
            direccion:data.direccion,
            //envio
            call_principal:data.call_principal,
            call_secundaria:data.call_secundaria,
            telefono_env:data.telefono_env,
            referencia:data.referencia,
            //imagn
            foto:data.imagen
          }) 
          );
      };

      Pedidos_Listado(data:any) {
        return this.http.post(
          this.URL_API + 'listar-pedidos', 
          this.objectToFormData({id_cliente: data.id_cliente})
          );
      }
      Pedidos_Listado_Historial(data:any) {
        return this.http.post(
          this.URL_API + 'listar-pedidos-historial', 
          this.objectToFormData({id_cliente: data.id_cliente})
          );
      }
      Pedido_consultar(id:string)
      {
        return this.http.get(
          this.URL_API + 'consultar-pedido/'+id , 
          );
      }
      //***********************CLIENTES INICIO******************************************/
      Factura_Guardar(data:any) {
      return this.http.post(
        this.URL_API + 'registrar-factura', 
        this.objectToFormData({
          id_cliente:data.id_cliente,
          nombres:data.nombres,
          apellidos:data.apellidos,
          email:data.email,
          telefono:data.telefono,
          ci: data.ci,
          direccion: data.direccion
        }) 
        );
    };
    /**************PROPUESTA********************* */
    Cliente_Acepta_Propuesta(data:any) {
      console.log(data);
      return this.http.post(
        this.URL_API + 'cliente-acepta-propuesta/'+data.id_propuesta, 
        this.objectToFormData({
          estado: 'Aceptado',
          cod_pedido: data.cod_pedido
  
        }) 
        );
    };

    /**********************PROVEEDOR******************* */
    proveedor_consultar(id:string)
    {
      return this.http.get(
        this.URL_API + 'consultar-proveedor/'+id , 
        );
    }




   //esta funcion es usada para formatear los parametros.
   objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }

      }
    }
    return fd;
  };


  randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

  verPublicidadMixta()
  {
    if(this.randomIntFromInterval(0,1)==1){
      this.admobService.MostrarInterstitial();
    }else{
      this.admobService.MostrarRewardVideo();
    }
  }

  //NOTIFICACIONES PUSH

  Inicializar_Notificacion() {
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          this.push.createChannel({
            id: "canalpropio",
            description: "InventarioApp",
            importance: 3,
            badge: false
          }).then(() => console.log('Channel created'));

          const pushObject: PushObject = this.push.init({
            android: {},
            ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
            },
            windows: {},
            browser: {
              pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
          });

          pushObject.on('notification').subscribe(async (notification: any) => {
            let alert = await this.toast.create({
              header: notification.title,
              message: notification.message,
              buttons: [
                {
                  text: 'Cerrar'
                }
              ]
            });
            alert.present();
            console.log('Notificación: ', notification);
          });

          pushObject.on('registration').subscribe((registration: any) => {
            console.log('Dispositivo: ', registration);
          });

          pushObject.on('error').subscribe(error => {
            console.error('Error with Push plugin', error)
          });
        } else {
          this.Mensajes('La aplicación no tiene permisos para recibir notificaciones.');
        }

      });
  }

}


