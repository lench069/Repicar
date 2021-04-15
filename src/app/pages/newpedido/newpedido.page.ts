import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';


@Component({
  selector: 'app-newpedido',
  templateUrl: './newpedido.page.html',
  styleUrls: ['./newpedido.page.scss'],
})
export class NewpedidoPage implements OnInit {

  public id_pais:number = 1;
  public id_provincia:number = 0;
  public id_ciudad:number = 0;
  public provincias:[] = [];

  constructor(public servicio:ServiciosService) { }

  ngOnInit() {
  }

  ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    if(this.id_pais != 0)
    {
      this.servicio.Provincias_por_pais(this.id_pais)
      .subscribe((data:any)=>{
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.info.items.length > 0)
        {
          this.provincias = data.info.items;
        }else{
          this.servicio.Mensajes('El pais seleccionado no tiene provincias asociadas.','danger');
        }
        
      },(error:any)=>{
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
      });
    }
  }

  Cargar_Ciudades(id_provincia:number)
  {
    console.log(id_provincia);
  }

}
