import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(public servicio:ServiciosService,
    private storage: Storage) { 
     
  }

  ngOnInit() {
  }

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    this.storage.create();
    let usuario = await this.storage.get('session_storage');
    console.log(usuario);
  }
  


}
