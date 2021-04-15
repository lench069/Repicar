import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewpedidoPage } from './newpedido.page';

const routes: Routes = [
  {
    path: '',
    component: NewpedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewpedidoPageRoutingModule {}
