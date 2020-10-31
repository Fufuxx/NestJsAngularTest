import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Observable, of, BehaviorSubject, combineLatest, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { environment } from './../../environments/environment';
import { Account } from '../../../shared/models/account';
import { Transaction } from '../../../shared/models/transaction';

@Injectable({ providedIn: 'root' })
export class DataService implements OnDestroy {
  subject: WebSocketSubject<any>;

  // Set initial value for exchange
  exchangeRate$ = new BehaviorSubject<number>(null);
  apiRoot = environment.api;

  accounts$: Observable<Account[]>;
  interval$: Observable<number> = of(0);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // -> Socket - Exchange Rate
      this.subject = webSocket({
        url: 'ws://localhost:8080',
        deserializer: (e) => JSON.parse(e.data)
      });
      this.subject.pipe(
        map(data => { 
          return data.exchange_rate;
        })
      );
      this.subject.subscribe(data => this.exchangeRate$.next(data.exchange_rate));
      // -> Interval trigger transaction change Account balance
      this.interval$ = interval(20000).pipe(startWith(0));
    }

    // -> NestJs Server - Fetch accounts
    this.accounts$ = combineLatest([
        this.http.get<Account[]>(`${this.apiRoot}/api/accounts`),
        this.interval$
      ]).pipe(
        map(([accounts]) => {
          // Trigger random transaction on interval
          return this.triggerTransaction(accounts);
        })
      );

    // -> Local seed Accounts
    // this.accounts$ = combineLatest([
    //     of(generateAccounts(15)),
    //     interval(2000).pipe(startWith(0))
    //   ]).pipe(
    //     map( ([accounts]) => {
    //       return accounts;
    //       // return this.triggerTransaction(accounts);
    //     })
    //   );
    // -> Local Change Exchange Rate Emit
    // setTimeout(
    //   () => this.exchangeRate$.next(5200),
    //   2000
    // );
  }

  getAccount(slug: string): Observable<Account> {
    // Find account
    return this.accounts$.pipe(
      map(accounts => {
        const account = accounts.find(account => account.slug === slug);
        return account;
      })
    );
  }

  // Util trigger random Transaction on Accounts (top 5 for easy visibility)
  triggerTransaction(accounts: Account[]) {
    const index = Math.floor(Math.random() * 5);
    // Hand made Transaction set on object as Account
    const account = accounts[index];
    const transaction = new Transaction('' + account.transactions.length + 1, account.balance);
    account.transactions.push(transaction);
    account.balance = transaction.balance;
    account.availableBalance = transaction.balance;
    return accounts;
  }

  ngOnDestroy() {
    if (this.subject) {
      this.subject.complete();
    }
  }
}