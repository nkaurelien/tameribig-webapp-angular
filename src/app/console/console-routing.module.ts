import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('@modules/console/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('@modules/console/parameters/parameters.module').then(m => m.ParametersModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
