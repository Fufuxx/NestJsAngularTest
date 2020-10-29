import { Component, Input } from '@angular/core';

import { Account } from '../../../../shared/models/account';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html'
})

export class AccountDetailsComponent {
  @Input() account!: Account;
}