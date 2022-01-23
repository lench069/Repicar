import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialNotiPageRoutingModule } from './historial-noti-routing.module';

import { HistorialNotiPage } from './historial-noti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialNotiPageRoutingModule
  ],
  declarations: [HistorialNotiPage]
})
export class HistorialNotiPageModule {}
