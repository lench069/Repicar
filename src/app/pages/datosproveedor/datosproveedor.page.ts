import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios.service';

@Component({
  selector: 'app-datosproveedor',
  templateUrl: './datosproveedor.page.html',
  styleUrls: ['./datosproveedor.page.scss'],
})
export class DatosproveedorPage implements OnInit {

  public id:string = '';
  public nombre_local:string='';
  public ciudad:string='';
  public provincia:string='';
  public nombres:string='';
  public email:string='';
  public celular:string='';
  public sector:string='';
  public direccion:string='';
  public arregloDeSubCadenas:string[] = [];

  constructor(private servicio:ServiciosService,
    public route:ActivatedRoute,
    public loading: LoadingController,) 
    {
      this.id = this.route.snapshot.params.cod_proveedor;
      const separador = "&"; // un espacio en blanco
      const limite    = 2;
      this.arregloDeSubCadenas = this.id.split(separador, limite);
      console.log(this.arregloDeSubCadenas[0]);
     }

  ngOnInit() {
  }

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    let l = await this.loading.create(); //se crea el loading
    l.present(); //se muestra el loading
    
    if(this.arregloDeSubCadenas[0] != '')
    {
      this.servicio.proveedor_consultar(this.arregloDeSubCadenas[0])
      .subscribe((data:any)=>{
        console.log(data);
      // this.servicio.Mensajes(data.mensaje,data.info.item.id == 0 ? 'danger': 'success');
        if(data.proveedor.CI_RUC != '')
        {
          this.nombre_local = data.proveedor.NOMBRE_LOCAL;
          this.ciudad = data.proveedor.NOMBRE_C;
          this.provincia = data.proveedor.NOMBRE_PRO;
          this.nombres = data.proveedor.NOMBRES;
          this.email = data.proveedor.EMAIL;
          this.celular = data.proveedor.TELEFONO;
          this.sector = data.proveedor.SECTOR;
          this.direccion = data.proveedor.DIRECCION;

          l.dismiss();//quita el loading una vez cargue todo
          this.servicio.Mensajes(data.mensaje,'success');
          
        }else{
          l.dismiss();//quita el loading una vez cargue todo
          this.servicio.Mensajes('El proveedor que desea consultar no existe.','danger');
         this.servicio.irA('/registropedido');
          
        }
        
      },(error:any)=>{
        l.dismiss();//quita el loading una vez cargue todo
          this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
          this.servicio.irA('/registropedido');

      });
    }
  }

}
