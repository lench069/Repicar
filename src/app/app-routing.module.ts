import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    //modificamos la ruta para que sea la inicia
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'acerca',
    loadChildren: () => import('./pages/acerca/acerca.module').then( m => m.AcercaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'newpedido',
    loadChildren: () => import('./pages/newpedido/newpedido.module').then( m => m.NewpedidoPageModule)
  },
  {
    path: 'facturas',
    loadChildren: () => import('./pages/facturas/facturas.module').then( m => m.FacturasPageModule)
  },
  {
    path: 'envios',
    loadChildren: () => import('./pages/envios/envios.module').then( m => m.EnviosPageModule)
  },
  {
    path: 'registropedido',
    loadChildren: () => import('./pages/registropedido/registropedido.module').then( m => m.RegistropedidoPageModule)
  },
  {
    path: 'propuestas/:cod_pedido',
    loadChildren: () => import('./pages/propuestas/propuestas.module').then( m => m.PropuestasPageModule)
  },
  {
    path: 'datosproveedor/:cod_proveedor',
    loadChildren: () => import('./pages/datosproveedor/datosproveedor.module').then( m => m.DatosproveedorPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
