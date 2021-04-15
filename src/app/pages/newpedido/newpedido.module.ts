import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewpedidoPageRoutingModule } from './newpedido-routing.module';

import { NewpedidoPage } from './newpedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewpedidoPageRoutingModule
  ],
  declarations: [NewpedidoPage]
})
export class NewpedidoPageModule {}
