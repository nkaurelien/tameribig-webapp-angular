import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleLayoutComponent } from './console-layout/console-layout.component';


const routes: Routes = [
  {
    path: '',
    component: ConsoleLayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('@modules/console/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('@modules/console/parameters/parameters.module').then(m => m.ParametersModule)
      },
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'user',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
