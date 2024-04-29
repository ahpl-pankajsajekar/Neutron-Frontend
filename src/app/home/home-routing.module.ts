import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { DcSearchComponent } from './Empanelment/dc-search/dc-search.component';

const empanelmentModule = () => import('./Empanelment/empanelment.module').then(x=>x.EmpanelmentModule)

const routes: Routes = [
  {
    path: 'empanelment',
    loadChildren: empanelmentModule,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: DcSearchComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
