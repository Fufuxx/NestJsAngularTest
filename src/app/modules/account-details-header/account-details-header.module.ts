import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightModule } from './../../directives/highlight.directive';
import { ComputedValueModule } from './../computed-value/computed-value.module';

import { AccountDetailsHeaderComponent } from './account-details-header.component';

@NgModule({
  declarations: [AccountDetailsHeaderComponent],
  imports: [
    CommonModule,
    HighlightModule,
    ComputedValueModule
  ],
  exports: [AccountDetailsHeaderComponent]
})

export class AccountDetailsHeaderModule {

}