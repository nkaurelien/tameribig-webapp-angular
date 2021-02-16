import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NetworkLayoutComponent} from './network-layout/network-layout.component';
import {UserNetworkActivitiesComponent} from './user-network-activities/user-network-activities.component';


const routes: Routes = [

    // { path: '',   redirectTo: HOME_PAGE, pathMatch: 'full'},
    {
        path: '',
        component: NetworkLayoutComponent,
        children: [
            {
                path: ':userid',
                children: [
                    {
                        path: 'activities',
                        component: UserNetworkActivitiesComponent
                    },
                    {
                        path: '',
                        loadChildren: () => import('@app/main/network/user-dashboad/user-dashboad.module').then(m => m.UserDashboadModule)
                    },
                ],

            },
        ],
        /*,
        {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
        }
        */
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }
