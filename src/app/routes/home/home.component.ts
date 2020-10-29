import { Component } from '@angular/core';

import { Account, generateAccounts } from 'shared/models/account';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  
  dataTable = {
    columns: [
      { label: 'Account Name', isSortable: true, key: 'name' },
      { label: 'Category', isSortable: true, key: 'category' },
      { label: 'Tags', isSortable: false, key: 'tags' },
      { label: 'Balance', isSortable: false, key: 'balance' },
      { label: 'Available Balance', isSortable: false, key: 'availableBalance' }
    ],
    data: generateAccounts(25)
  };

  ngOnInit() {
    // Set random changes Account
    setInterval( 
      () => this.dataTable.data = this.changeRanAccount(this.dataTable.data),
      2000
    );
  }

  changeRanAccount(accounts: Account[]) {
    const index = Math.floor(Math.random() * 5);
    const newData = this.getRan();
    accounts[index].balance = newData.balance;
    accounts[index].availableBalance = newData.available;
    return accounts;
  }

  getRan() {
    const BALANCE = Number((Math.random() * 20).toFixed(8));
    return {
      balance: BALANCE,
      available: Number((BALANCE - BALANCE/5).toFixed(8))
    };
  }
  
}