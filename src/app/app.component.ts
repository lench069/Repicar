import { Component } from '@angular/core';
import { ServiciosService } from './servicios.service';
import { Storage } from '@ionic/storage-angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public id:number = 0;
  public cliente:any = '';
   
  constructor(
    private storage: Storage,
    private servicio:ServiciosService,
    private device: Device) {
      console.log('Device UUID is: ' + this.device.uuid);
      this.ionViewWillEnter();
    }

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    this.storage.create();
    let usuario = await this.storage.get('session_storage');
    this.id = usuario.ID_CLIENTE;
    if(this.id != 0)
    {
      this.cliente = usuario;
      this.servicio.irA('/inicio');
    }else 
    {
      this.servicio.irA('/login');
    }
  }


}
