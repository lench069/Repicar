import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  //URL del servidor
  private URL_API: string = 'http://localhost/api_repicar/'; 


  constructor(private router: Router,
    private http: HttpClient,
    private toast: ToastController,) { }

  irA (url:string)
  {
    this.router.navigateByUrl(url);
  }

  //permite mostrar mesajes al momento de utilizar los servicios, al usar el toast se debe definir la funcion como asycn.
  async Mensajes (texto:string, tipo:string = 'success'){
    let t = await this.toast.create({
      message: texto,
      color: tipo,
      duration: 2000
    });
    t.present();

  }

  //***********************CLIENTES INICIO******************************************/
  Cliente_Guardar(data:any) {
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
  Usuario_consultar(id:number) {
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
        foto: data.imagen
      }) 
      );
  };

  //***********************PROVINCIA INICIO******************************************/
  Provincias_por_pais(id_pais:number) {
    return this.http.get(
      this.URL_API + 'provincias-pais/'+id_pais , 
      );
  };



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
}


