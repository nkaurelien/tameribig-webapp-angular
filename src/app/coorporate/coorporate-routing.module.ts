import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CoorporateComponent } from './coorporate.component';
import { PrivacyPolicieComponent } from './privacyPolicie/privacypolicie.component';


export const HOME_PAGE = ``;
export const PRIVACY_PAGE = `privacy`;
export const CONTACT_US_PAGE = `contact-us`;
export const ABOUT_US_PAGE = `about-us`;
export const ABOUT_SERVICES_PAGE = `about-services`;
export const RECRUTMENT_PAGE = `recrutment`;
export const FAQ_PAGE = `faq`;

const routes: Routes = [

    // { path: '',   redirectTo: HOME_PAGE, pathMatch: 'full'},
    {
        path: HOME_PAGE,
        component: CoorporateComponent,
        children: [
            {
                path: PRIVACY_PAGE,
                component: PrivacyPolicieComponent

            },
            {
                path: CONTACT_US_PAGE,
                loadChildren: () => import('@modules/coorporate/contact-us/contact-us.module').then(m => m.ContactUsModule),

            },
            {
                path: RECRUTMENT_PAGE,
                loadChildren: () => import('@modules/coorporate/recrutment/recrutment.module').then(m => m.RecrutmentModule),

            },
            {
                path: FAQ_PAGE,
                loadChildren: () => import('@modules/coorporate/faq/faq.module').then(m => m.FaqModule),

            },
            {
                path: ABOUT_US_PAGE,
                loadChildren: () => import('@modules/coorporate/about-us/about-us.module').then(m => m.AboutUsModule),

            },
            {
                path: ABOUT_SERVICES_PAGE,
                loadChildren: () => import('@modules/coorporate/about-services/about-services.module').then(m => m.AboutServicesModule),

            }
        ],
        /*,
          {
          path: '**',
          redirectTo: '',
          pathMatch: 'full'
          }*/
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CooporateRoutingModule {
}
