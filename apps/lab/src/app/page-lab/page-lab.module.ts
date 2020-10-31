import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LabPageLabComponent } from './page-lab.component';
import { LabPageLabRoutingModule } from './page-lab.routing';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NzInputModule,
    NzIconModule,
    LabPageLabRoutingModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTreeModule,
    NzRadioModule,
    NzTabsModule,
  ],
  declarations: [
    LabPageLabComponent,
  ],
  exports: [
    LabPageLabComponent,
  ],
})
export class LabPageLabModule {}
