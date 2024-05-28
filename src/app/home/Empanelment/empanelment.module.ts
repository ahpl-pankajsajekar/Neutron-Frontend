import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpanelmentRoutingModule } from './empanelment-routing.module';
import { DcSearchComponent } from './dc-search/dc-search.component';
import { DcgpListComponent } from './dcgp-list/dcgp-list.component';
import { NonEmpanelmentComponent } from './non-empanelment/non-empanelment.component';
import { EmpanelmentRequestComponent } from './empanelment-request/empanelment-request.component';
import { DcRegistrationComponent } from './dc-registration/dc-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DcDetailsComponent } from './dc-search/dc-details/dc-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { DcVerifyComponent } from './dc-verify/dc-verify.component';
import { DcDocusignComponent } from './dc-docusign/dc-docusign.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { NetworkVerifyComponent } from './network-verify/network-verify.component';

import {MatTabsModule} from '@angular/material/tabs';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { RequestpageOperationComponent } from './requestpage-operation/requestpage-operation.component';

@NgModule({
  declarations: [
    // DcSearchComponent,
    DcgpListComponent,
    NonEmpanelmentComponent,
    EmpanelmentRequestComponent,
    DcRegistrationComponent,
    DcDetailsComponent,
    DcVerifyComponent,
    DcDocusignComponent,
    SuccessModalComponent,
    NetworkVerifyComponent,
    CandidateFormComponent,
    RequestpageOperationComponent,
    
  ],
  imports: [
    CommonModule,
    EmpanelmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    NgMultiSelectDropDownModule,

    MatIconModule,
    MatExpansionModule,

    MatTabsModule,

  ]
})
export class EmpanelmentModule {
}
