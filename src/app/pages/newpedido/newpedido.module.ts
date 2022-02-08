import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewpedidoPageRoutingModule } from './newpedido-routing.module';

import { NewpedidoPage } from './newpedido.page';

import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomFormsModule,
    NewpedidoPageRoutingModule
  ],
  declarations: [NewpedidoPage]
})
export class NewpedidoPageModule {}
