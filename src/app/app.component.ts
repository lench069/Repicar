import { Component } from '@angular/core';
import { ServiciosService } from './servicios.service';
import { Storage } from '@ionic/storage-angular';
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
    private servicio:ServiciosService) {}

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    let usuario = await this.storage.get('session_storage');
    this.id = usuario.ID_CLIENTE;
    if(this.id != 0)
    {
      this.cliente = usuario;
      console.log();
    }else 
    {
      this.servicio.irA('/login');
    }
  }
  async logout()
  {
    await this.storage.clear();
    this.servicio.irA('/login')
  }

}
