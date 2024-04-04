import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DcSearchComponent } from './dc-search/dc-search.component';
import { DcgpListComponent } from './dcgp-list/dcgp-list.component';
import { EmpanelmentRequestComponent } from './empanelment-request/empanelment-request.component';
import { NonEmpanelmentComponent } from './non-empanelment/non-empanelment.component';
import { HomeComponent } from '../home.component';
import { DcRegistrationComponent } from './dc-registration/dc-registration.component';
import { DcDetailsComponent } from './dc-search/dc-details/dc-details.component';

const routes: Routes = [
  {
    path :'',
    children:[
      {
        path: 'dc-request',
        component: EmpanelmentRequestComponent,
      },
      {
        path: 'dc-search',
        component: DcSearchComponent,
      },
      {
        path: 'dc-search/view',
        component: DcDetailsComponent,
      },
      {
        path: 'non-empanelment',
        component: NonEmpanelmentComponent,
      },
      {
        path: 'dcgp-list',
        component: DcgpListComponent,
      },
      {
        path: 'dc-reg',
        component: DcRegistrationComponent,
      },
    ]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpanelmentRoutingModule { }
