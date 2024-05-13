import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { SelfEmpanlementComponent } from './dc/self-empanlement/self-empanlement.component';
import { ThankYouComponent } from './dc/self-empanlement/thank-you/thank-you.component';



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
    {
        path: 'selfempanelment',
        component: SelfEmpanlementComponent
    },
    {
        path: 'selfempanelment/thankyou',
        component: ThankYouComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
