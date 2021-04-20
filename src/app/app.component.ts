import { Component } from '@angular/core';
import { ServiciosService } from './servicios.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public id:number = 4;
  public nombres: string = '';
  public apellidos: string = '';
  public celular: string = '';
  public email: string = '';
  public estado: string = '';
  public contrasenia: string = '';
  public imagen:any = null;
  
  constructor(public servicio: ServiciosService,) {}

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

}
