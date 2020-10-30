import { Component, Input } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

import { DataService } from './../../services/data.service';
import { Account } from '../../../../shared/models/account';
import { map } from 'rxjs/operators';

class UpdatedValues {
  computedBalance: number;
  computedAvailable: number;
}

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html'
})

export class AccountDetailsComponent {
  @Input() account!: Account;
  computedValues$: Observable<UpdatedValues>;

  constructor(private dataService: DataService) {

  }

  ngOnChanges(changes) {
    this.computedValues$ = this.dataService.exchangeRate$.pipe(
      map((rate: number) => {
        if(!rate) { return null; }
        else {
          return {
            computedBalance: this.account.balance * rate,
            computedAvailable: this.account.availableBalance * rate
          }
        }
      })
    );
  }
}