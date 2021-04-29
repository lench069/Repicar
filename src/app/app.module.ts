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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
