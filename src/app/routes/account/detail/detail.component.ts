import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from './../../../services/data.service';

import { DataTable } from '../../../modules/datatable/datatable.component';
import { Account } from 'shared/models/account';
import { Transaction } from 'shared/models/transaction';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent {
  account$: Observable<Account>;
  dataTable: DataTable<Transaction>;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.account$ = this.dataService.getAccount(slug)
      .pipe(
        map((account: Account) => {
          this.dataTable = {
            columns: [
              { label: 'Date', isSortable: false, key: 'date' },
              { label: 'Order ID', isSortable: true, key: 'id' },
              { label: 'Transaction type', isSortable: false, key: 'type' },
              { label: 'Debit', isSortable: false, key: 'debit' },
              { label: 'Credit', isSortable: false, key: 'credit' },
              { label: 'Balance', isSortable: false, key: 'balance' }
            ],
            data: account.transactions
          };
          return account;
        })
      );
  }

}