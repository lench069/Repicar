import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/servicios.service';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.page.html',
  styleUrls: ['./propuestas.page.scss'],
})
export class PropuestasPage implements OnInit {

  public id:string = '';
  public pedido:any[]=[];
  public fecha_pedido:string='';
  public hora_pedido:string='';
  public propuestas:any[]=[];

  constructor(private servicio:ServiciosService,
    public route:ActivatedRoute //Toma los valores utilizado en el router en este caso el producto_id
    ) { 
      this.id = this.route.snapshot.params.cod_pedido;
      console.log(this.id);
    }

  ngOnInit() {
  }

  ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    console.log(this.id);
    if(this.id != '')
    {
      this.servicio.Pedido_consultar(this.id)
      .subscribe((data:any)=>{
        console.log(data);
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.pedido.COD_PEDIDO != '')
        {
          this.pedido = data.pedido;
          this.propuestas = data.propuestas;
          this.fecha_pedido = data.pedido.FECHA_INI.substr(0,10);
          this.hora_pedido = data.pedido.FECHA_INI.substr(11,5);
          this.servicio.Mensajes(data.mensaje,'success');
        }else{
          this.servicio.Mensajes('El pedido que desea consultar no existe.','danger');
          this.servicio.irA('/registropedido');
        }
        
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
          this.servicio.irA('/registropedido');
      });
    }
  }

}