import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const empanelmentModule = () => import('./Empanelment/empanelment.module').then(x=>x.EmpanelmentModule)

const routes: Routes = [
  {
    path: 'empanelment',
    loadChildren: empanelmentModule,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
