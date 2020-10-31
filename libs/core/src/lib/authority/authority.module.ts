import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LabPageErrorComponent } from './page-error/page-error.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  declarations: [
    LabPageErrorComponent,
  ],
  exports: [
    LabPageErrorComponent,
  ],
})
export class LabAuthorityModule {}
