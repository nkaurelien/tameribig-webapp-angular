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
        loadChildren: () => import('@app/main/console/assets/assets.module').then(m => m.AssetsModule)
      },
      {
        path: 'user',
        loadChildren: () => import('@app/main/console/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('@app/main/console/parameters/parameters.module').then(m => m.ParametersModule)
      },
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full'
      // },
      // {
      //   path: '**',
      //   redirectTo: '404',
      //   pathMatch: 'full'
      // },
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: 'user',
  //   pathMatch: 'full'
  // },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
