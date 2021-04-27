import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropuestasPage } from './propuestas.page';

const routes: Routes = [
  {
    path: '',
    component: PropuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropuestasPageRoutingModule {}
