import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('@modules/auth2/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'console',
        loadChildren: () => import('@modules/console/console.module').then(m => m.ConsoleModule)
    },
    {
        path: '',
        loadChildren: () => import('@modules/main/main.module').then(m => m.MainModule)
    },
    ]
;

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
