import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { Storage } from '@ionic/storage-angular';
//IMPORTAMOS NUESTRO SERVICIO
import { AdmobService } from 'src/app/services/admob.service';
import { LoadingController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public total_pedidos: number = 0;
  public total_pedidos_aceptados: number = 0;
  public id:number=0;
  constructor(public servicio:ServiciosService,
    private storage: Storage,private admobService: AdmobService,public loading: LoadingController
    ,public apermisos:AndroidPermissions) { 
     
  }

  ngOnInit() {
    this.admobService.MostrarBanner();

    this.apermisos.requestPermissions([
      this.apermisos.PERMISSION.CAMERA,
      this.apermisos.PERMISSION.BIND_NOTIFICATION_LISTENER_SERVICE,
      this.apermisos.PERMISSION.ACCESS_NOTIFICATION_POLICY,
    ]).then((data: any) => {

    });

    this.servicio.Inicializar_Notificaciones();
 }

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    this.storage.create();
    let usuario = await this.storage.get('session_storage');
    this.id = usuario.ID_CLIENTE;
    console.log(usuario);
    this.total_Pedidos();
  }

  async total_Pedidos() {
    let l = await this.loading.create(); //se crea el loading
    l.present(); //se muestra el loading
   this.servicio.total_pedidos({
      id_cliente: this.id 
   }) // llamado al servicio
   .subscribe((data:any)=>{   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
    console.log(data);
    if(data.info.length > 0)
    {
      this.total_pedidos = data.info[0].info_totales[0].total_pedido;
      this.total_pedidos_aceptados = data.info[0].totales_pedidos[0].total_pedido_Aceptados;
    }
     l.dismiss();//quita el loading una vez cargue todo
   },(error:any)=>{
    l.dismiss();//quita el loading una vez cargue todo
      this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
  });
 }
 
}
