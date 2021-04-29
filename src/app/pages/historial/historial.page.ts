import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  public pedidos:any=[];
  public id_cliente:number=0;

  constructor(public servicio: ServiciosService,
    public loading: LoadingController,
    private storage: Storage) { }

  ngOnInit() {
  }
  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    this.storage.create();
    let usuario = await this.storage.get('session_storage');
    this.id_cliente = usuario.ID_CLIENTE;
    this.Cargar_Pedidos();
  };
  async Cargar_Pedidos() {
    let l = await this.loading.create(); //se crea el loading
    l.present(); //se muestra el loading
   this.servicio.Pedidos_Listado({
      id_cliente: this.id_cliente
   }) // llamado al servicio
   .subscribe((data:any)=>{   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
    console.log(data);
     this.pedidos = data;
     l.dismiss();//quita el loading una vez cargue todo
   },(error:any)=>{ //sentencias cuando ocurrio un error

   })
 }

}
