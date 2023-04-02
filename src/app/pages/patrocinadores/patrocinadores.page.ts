import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios.service';

@Component({
  selector: 'app-patrocinadores',
  templateUrl: './patrocinadores.page.html',
  styleUrls: ['./patrocinadores.page.scss'],
})
export class PatrocinadoresPage implements OnInit {

  private id: number = 0;
  private patrocinadores = [];

  constructor(private servicio:ServiciosService,
    public route:ActivatedRoute, private loading:LoadingController) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
  }

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    let l = await this.loading.create(); //se crea el loading
    l.present(); //se muestra el loading
    console.log(this.id);
    if(this.id != 0)
    {
      this.servicio.Patrocinadores_consultar(this.id)
      .subscribe((data:any)=>{
        console.log(data);
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.info.items.length > 0)
        {     
          this.patrocinadores = data.info.items;
        
          l.dismiss();//quita el loading una vez cargue todo
         // this.servicio.Mensajes(data.mensaje,'success')      
        }else{
          l.dismiss();//quita el loading una vez cargue todo
          this.servicio.Mensajes('No existen patrocinadores para el tipo escogido.','danger');
          this.servicio.irA('/inicio');       
        }       
      },(error:any)=>{
        l.dismiss();//quita el loading una vez cargue todo
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
          this.servicio.irA('/inicio');

      });
    }
  }

}
