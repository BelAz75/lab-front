import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabAuthorityModule } from './authority/authority.module';

@NgModule({
  imports: [
    CommonModule,
    LabAuthorityModule,
  ],
})
export class CoreModule {}
