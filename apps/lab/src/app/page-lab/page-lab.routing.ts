import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabPageLabComponent } from './page-lab.component';

const routes: Routes = [
  {
    path: '',
    component: LabPageLabComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabPageLabRoutingModule { }
