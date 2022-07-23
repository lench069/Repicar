import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/servicios.service';
import { Storage } from '@ionic/storage-angular';
//IMPORTAMOS NUESTRO SERVICIO
import { AdmobService } from 'src/app/services/admob.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public total_pedidos: number = 0;
  public total_pedidos_aceptados: number = 0;
  public id:number=0;
  public num_noti:number=0;
  public slideOpts:any = {
    initialSlide: 1,
    speed: 400
  };

  categories = {
    slidesPerView: 2.5,
    initialSlide: 0,
    autoplay:true,
    speed:200
  };
  public flag:Boolean = false;
  private suscriptor: Subscription;
  constructor(public servicio:ServiciosService,
    private storage: Storage,
    private admobService: AdmobService,
    public loading: LoadingController,
    public apermisos: AndroidPermissions,
    public alert: AlertController
    ) { 

      this.suscriptor = servicio.$emitter.subscribe(() => {
        this.mostrarPopup();
      });
      
  }

  ngOnInit() {
    this.apermisos.requestPermissions([
      this.apermisos.PERMISSION.CAMERA,
      this.apermisos.PERMISSION.BIND_NOTIFICATION_LISTENER_SERVICE,
      this.apermisos.PERMISSION.ACCESS_NOTIFICATION_POLICY,
    ]).then((data: any) => {

    });

    this.slideOpts = this.fades;

  }

  async ionViewWillEnter() //se ejecuta a penas se abra la vista
  {
    this.storage.create();
    let usuario = await this.storage.get('session_storage');
    this.id = usuario.ID_CLIENTE;
    console.log(usuario);
    //PUSH
    this.servicio.Inicializar_Notificacion(usuario);
    //Publicidad
    this.admobService.MostrarBanner();
    this.total_Pedidos();
    //Consultar historial notificaciones
    this.num_notificaciones();
    
  }

  async mostrarPopup(){
    let alert = await this.alert.create({
      header: 'Alerta',
      message: 'El pedido solicitado se puede ver en la opcion pendientes',
      buttons: [
        {
          text: 'Si',
          handler: () => { }
        },   
      ]
    });
    alert.present();
  }

   num_notificaciones() {
   this.servicio.num_noti(this.id) // llamado al servicio
   .subscribe((data:any)=>{   //promesa espera hasta que regrese la data aqui va cuando fue exitoso
    console.log(data);
    if(data.length > 0)
    {
      this.num_noti= data.length;
    }else{
      this.num_noti = 0;
    }
   },(error:any)=>{
      this.servicio.Mensajes('No se pudo realizar la peticion.','danger');
  });
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

public fades = {
  initialSlide: 0,
  slidesPerView: 1,
  autoplay:true,
  on: {
    beforeInit() {
      const swiper = this;
      swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
      const overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      swiper.params = Object.assign(swiper.params, overwriteParams);
      swiper.params = Object.assign(swiper.originalParams, overwriteParams);
    },
    setTranslate() {
      const swiper = this;
      const { slides } = swiper;
      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = swiper.slides.eq(i);
        const offset$$1 = $slideEl[0].swiperSlideOffset;
        let tx = -offset$$1;
        if (!swiper.params.virtualTranslate) tx -= swiper.translate;
        let ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }
        const slideOpacity = swiper.params.fadeEffect.crossFade
          ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
          : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl
          .css({
            opacity: slideOpacity,
          })
          .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
      }
    },
    setTransition(duration) {
      const swiper = this;
      const { slides, $wrapperEl } = swiper;
      slides.transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        let eventTriggered = false;
        slides.transitionEnd(() => {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;
          eventTriggered = true;
          swiper.animating = false;
          const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (let i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },  
  }
};

}
