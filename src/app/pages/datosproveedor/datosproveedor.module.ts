import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosproveedorPageRoutingModule } from './datosproveedor-routing.module';

import { DatosproveedorPage } from './datosproveedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosproveedorPageRoutingModule
  ],
  declarations: [DatosproveedorPage]
})
export class DatosproveedorPageModule {}
