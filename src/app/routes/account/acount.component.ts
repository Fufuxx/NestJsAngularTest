import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

import { DataService } from './../../services/data.service';
import { Account } from '../../../../shared/models/account';
import { DataTable } from './../../modules/datatable/datatable.component';

import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent {
  dataTable: DataTable<Account>;
  sub = new Subscription();

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if(isPlatformBrowser(this.platformId)) {
      this.sub.add(
        this.dataService.accounts$
          .subscribe((accounts: Account[]) => {
            this.dataTable = {
              columns: [
                { label: 'Account Name', isSortable: true, key: 'name' },
                { label: 'Category', isSortable: true, key: 'category' },
                { label: 'Tags', isSortable: false, key: 'tags' },
                { label: 'Balance', isSortable: false, key: 'balance' },
                { label: 'Available Balance', isSortable: false, key: 'availableBalance' }
              ],
              data: accounts
            }
          })
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
}