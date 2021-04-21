import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistropedidoPageRoutingModule } from './registropedido-routing.module';

import { RegistropedidoPage } from './registropedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistropedidoPageRoutingModule
  ],
  declarations: [RegistropedidoPage]
})
export class RegistropedidoPageModule {}
