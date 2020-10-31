import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabPageErrorComponent } from '@lab/core/authority/page-error/page-error.component';

export const LAB_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@lab/core/authority/page-auth/page-auth.module').then(m => m.LabPageAuthModule)
  },
  {
    path: 'lab',
    loadChildren: () => import('./page-lab/page-lab.module').then(m => m.LabPageLabModule)
  },
  {
    path: 'lab-create',
    loadChildren: () => import('./page-lab-create/page-lab-create.module').then(m => m.LabPageLabCreateModule)
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: LabPageErrorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(LAB_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class LabRoutingModule {
}
