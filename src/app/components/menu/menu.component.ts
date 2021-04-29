import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public id:number=0;
  public cliente:any=null;

  constructor(private servicio:ServiciosService,
    private storage: Storage) { 
     
    }

  ngOnInit() {

  }
  
  async inicializar() //se ejecuta a penas se abra la vista
  {
    this.storage.create();
    let usuario = await this.storage.get('session_storage');
    this.id = usuario.ID_CLIENTE;
    
    if(this.id != 0)
    {
      this.servicio.Cliente_consultar(this.id)
      .subscribe((data:any)=>{
        console.log(data);
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.info.item.ID_CLIENTE > 0)
        {
          console.log(data.info.item);
          this.cliente = data.info.item;
          
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

  async logout()
  {
    await this.storage.clear();
    this.servicio.irA('/login')
  }


}
