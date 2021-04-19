import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';

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
  public imagen: any = '';

  constructor(public servicio:ServiciosService) { }

  ngOnInit() {
  }

  Guardar (){
    if(this.nombres == '')
    {
      this.servicio.Mensajes('Debe ingresar sus nombres.', 'warning');
    }else if(this.apellidos == '')
    {
      this.servicio.Mensajes('Debe ingresar sus apellidos.', 'warning');
    }else if(this.celular == '')
    {
      this.servicio.Mensajes('Debe ingresar un numero de celular.', 'warning');
    }else if(this.email == '') 
    {
      this.servicio.Mensajes('Debe ingresar un email.', 'warning');
    }else if(this.contrasenia == '')
    {
      this.servicio.Mensajes('Debe ingresar una contraseña.', 'warning');
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

}
