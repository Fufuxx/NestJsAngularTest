import { Component, Input } from '@angular/core';

import { Account } from '../../../../shared/models/account';

@Component({
  selector: 'app-account-details-header',
  templateUrl: './account-details-header.component.html',
  styleUrls: ['./account-details-header.component.scss']
})

export class AccountDetailsHeaderComponent {
  @Input() account!: Account;
}