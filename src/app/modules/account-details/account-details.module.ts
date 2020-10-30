import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountDetailsComponent } from './account-details.component';

@NgModule({
  declarations: [AccountDetailsComponent],
  imports: [CommonModule],
  exports: [AccountDetailsComponent]
})

export class AccountDetailsModule {

}