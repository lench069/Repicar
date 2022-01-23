import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, IonItemSliding } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-historial-noti',
  templateUrl: './historial-noti.page.html',
  styleUrls: ['./historial-noti.page.scss'],
})
export class HistorialNotiPage implements OnInit {

  public notificaciones:any=[];
  public id_cliente:number=0;

  constructor(public servicio: ServiciosService,
    public loading: LoadingController,
    private storage: Storage,
    public route:ActivatedRoute) { 

    }

  ngOnInit() {
  }

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    this.storage.create();
    let usuario = await this.storage.get('session_storage');
    this.id_cliente = usuario.ID_CLIENTE;
    this.Cargar_notificaciones();
  };

  async Cargar_notificaciones() {
    let l = await this.loading.create(); //se crea el loading
    l.present(); //se muestra el loading
   this.servicio.Cargar_notificaciones({
      id_cliente: this.id_cliente
   }) // llamado al servicio
   .subscribe((data:any)=>{   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
    console.log(data);
     this.notificaciones = data;
     l.dismiss();//quita el loading una vez cargue todo
   },(error:any)=>{ //sentencias cuando ocurrio un error
      
   })
 }
 Detalles_Pedido(noti:any, identificador:IonItemSliding)
 {

  this.servicio.marcarVistaNoti({
    id_noti:noti.ID_NOTIFICACIONES,
    estado:1,
  }).subscribe((data:any)=>{
    this.servicio.Mensajes(data.mensaje,data.info.id == 0 ? 'danger' : 'success');
    identificador.close(); //para cerrar el sliding al momento de regresar a la pagina
    this.servicio.irA('/propuestas/'+noti.COD_PEDIDO);
  },(error:any)=>{
      this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
  });

 };

}
