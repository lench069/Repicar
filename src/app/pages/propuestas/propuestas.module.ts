import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropuestasPageRoutingModule } from './propuestas-routing.module';

import { PropuestasPage } from './propuestas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropuestasPageRoutingModule
  ],
  declarations: [PropuestasPage]
})
export class PropuestasPageModule {}
