import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DcSearchComponent } from './dc-search/dc-search.component';
import { DcgpListComponent } from './dcgp-list/dcgp-list.component';
import { EmpanelmentRequestComponent } from './empanelment-request/empanelment-request.component';
import { NonEmpanelmentComponent } from './non-empanelment/non-empanelment.component';
import { HomeComponent } from '../home.component';
import { DcRegistrationComponent } from './dc-registration/dc-registration.component';
import { DcDetailsComponent } from './dc-search/dc-details/dc-details.component';
import { DcVerifyComponent } from './dc-verify/dc-verify.component';
import { DcDocusignComponent } from './dc-docusign/dc-docusign.component';
import {  SuccessModalComponent } from './success-modal/success-modal.component';
import { NetworkVerifyComponent } from './network-verify/network-verify.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { RequestpageOperationComponent } from './requestpage-operation/requestpage-operation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerspectiveProviderComponent } from './perspective-provider/perspective-provider.component';
import { OperationsManageComponent } from './operations-manage/operations-manage.component';
import { ManualempanelmentComponent } from './manualempanelment/manualempanelment.component';


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
        path: 'legal-verify',
        component: DcVerifyComponent,
      },
      {
        path: 'network-verify',
        component: NetworkVerifyComponent,
      },
      {
        path: 'dc-reg',
        component: DcRegistrationComponent,
      },
      {
        path: 'dcverification',
        component: DcRegistrationComponent,
      },
      {
        path: 'dc-docusign',
        component: DcDocusignComponent,
      },
      {
        path: 'success-modal',
        component:  SuccessModalComponent,
      },
      {
        path: 'candidate-form',
        component:  CandidateFormComponent,
      },
      {
        path: 'Requestpage_operation',
        component:  RequestpageOperationComponent,
      },
      {
        path: 'manage',
        component: OperationsManageComponent,
      },
      {
        path: 'dashboard',
        component:  DashboardComponent,
      },
      {
        path: 'perspective',
        component:  PerspectiveProviderComponent,
      },
      {
        path: 'manualempanelment',
        component:  ManualempanelmentComponent,
      },

    ]
  }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpanelmentRoutingModule { }
