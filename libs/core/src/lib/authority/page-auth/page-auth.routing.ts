import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabPageAuthComponent } from './page-auth.component';

const routes: Routes = [
  {
    path: '',
    component: LabPageAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabPageAuthRoutingModule { }
