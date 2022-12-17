import { Component, OnInit } from '@angular/core';
import { LoadingController,IonItemSliding } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-registropedido',
  templateUrl: './registropedido.page.html',
  styleUrls: ['./registropedido.page.scss'],
})
export class RegistropedidoPage implements OnInit {

  public pedidos:any=[];
  public id_cliente:number=0;

  constructor(  public servicio: ServiciosService,
    public loading: LoadingController,
    private storage: Storage) { 
  
  }

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
    if(data.length > 0)
    {
      this.pedidos = data;
    }else {
      this.pedidos = [];
      //this.servicio.Mensajes('Aun no tienes pedidos.','warning');  // Se retira este mensaje por que se coloco directo en la vista
    }
     l.dismiss();//quita el loading una vez cargue todo
   },(error:any)=>{ //sentencias cuando ocurrio un error
    this.servicio.Mensajes('Compruebe su conexion a internet.','danger');
      l.dismiss();//quita el loading una vez cargue todo
      this.servicio.irA('/inicio');
   })
 }
 Detalles_Pedido(pedido:any, identificador:IonItemSliding)
 {
    identificador.close(); //para cerrar el sliding al momento de regresar a la pagina
    this.servicio.irA('/propuestas/'+pedido.COD_PEDIDO);
 };

 async Borrar_Pedido(pedido:any){

  let l = await this.loading.create(); //se crea el loading
    l.present(); //se muestra el loading
   this.servicio.borrar_pedido(pedido.COD_PEDIDO) // llamado al servicio
   .subscribe((data:any)=>{   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
    
    if(data.mensaje == 'delete')
    {
      this.Cargar_Pedidos();
    }else {
      //this.servicio.Mensajes('Aun no tienes pedidos.','warning');  // Se retira este mensaje por que se coloco directo en la vista
    }
     l.dismiss();//quita el loading una vez cargue todo
   },(error:any)=>{ //sentencias cuando ocurrio un error
    this.servicio.Mensajes('Compruebe su conexion a internet.','danger');
      l.dismiss();//quita el loading una vez cargue todo
      this.servicio.irA('/inicio');
   })
    
 }
 

}
