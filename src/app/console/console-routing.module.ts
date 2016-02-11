import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleLayoutComponent } from './console-layout/console-layout.component';



const routes: Routes = [
  {
    path: '',
    component: ConsoleLayoutComponent,
    children: [
      {
        path: 'assets',
        loadChildren: () => import('@modules/console/assets/assets.module').then(m => m.AssetsModule)
      },
      {
        path: 'user',
        loadChildren: () => import('@modules/console/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@modules/console/user-dashboad/user-dashboad.module').then(m => m.UserDashboadModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('@modules/console/parameters/parameters.module').then(m => m.ParametersModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
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
