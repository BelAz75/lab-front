import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LabPageLabCreateComponent } from './page-lab-create.component';
import { LabPageLabCreateRoutingModule } from './page-lab-create.routing';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NzInputModule,
    NzIconModule,
    LabPageLabCreateRoutingModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTreeModule,
    NzRadioModule,
    NzTabsModule,
  ],
  declarations: [
    LabPageLabCreateComponent,
  ],
  exports: [
    LabPageLabCreateComponent,
  ],
})
export class LabPageLabCreateModule {}
