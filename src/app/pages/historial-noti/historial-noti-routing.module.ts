import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialNotiPage } from './historial-noti.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialNotiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialNotiPageRoutingModule {}
