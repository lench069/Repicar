import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//servicio
import { ServiciosService } from './servicios.service';
//importante para usar web services
import { HttpClientModule } from '@angular/common/http';
//importante para el uso de la camara
import { Camera } from '@ionic-native/camera/ngx';
//para el storage
//import { IonicStorageModule } from '@ionic/Storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ComponentsModule } from './components/components.module';
//IMPORTAMOS ADMOB FREE.
import { AdMobFree } from '@ionic-native/admob-free/ngx';
//IMPORTAMOS SERVICIO ADMOB PROPIO.
import { AdmobService } from './services/admob.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule, 
    IonicStorageModule.forRoot(), 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ComponentsModule],
  providers: [
    ServiciosService,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //AÑADIMOS ADMOB COMO PROVIDER
    AdMobFree,
    //AÑADIMOS NUESTRO SERVICIO.
    AdmobService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
