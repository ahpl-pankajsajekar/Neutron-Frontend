import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule)
const homeModule = () => import('./home/home.module').then(x => x.HomeModule)

export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent,
        loadChildren: homeModule,
        canActivate: [AuthGuard]
    },
    { 
        path: 'account', 
        loadChildren: accountModule 
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
