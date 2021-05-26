import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosproveedorPage } from './datosproveedor.page';

const routes: Routes = [
  {
    path: '',
    component: DatosproveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosproveedorPageRoutingModule {}
