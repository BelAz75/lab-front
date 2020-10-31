import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LabPageAuthComponent } from '@lab/core/authority/page-auth/page-auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LabPageAuthRoutingModule } from './page-auth.routing';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NzInputModule,
    NzIconModule,
    LabPageAuthRoutingModule,
    ReactiveFormsModule,
    NzButtonModule
  ],
  declarations: [
    LabPageAuthComponent,
  ],
  exports: [
    LabPageAuthComponent,
  ],
})
export class LabPageAuthModule {}
