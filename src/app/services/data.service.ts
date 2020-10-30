import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Observable, of, BehaviorSubject, combineLatest, interval } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { environment } from './../../environments/environment';
import { Account, generateAccounts } from '../../../shared/models/account';

@Injectable({ providedIn: 'root' })
export class DataService implements OnDestroy {
  subject: WebSocketSubject<any>;
  // Set initial value for exchange so highlight will be triggered
  exchangeRate$ = new BehaviorSubject<number>(null);
  apiRoot = environment.api;
  accounts$: Observable<Account[]>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
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
    }

    // Fetch accounts
    // this.accounts$ = this.http.get(`${this.apiRoot}/api/accounts`)
    //   .pipe(map((data: any) => data.accounts));

    // Test
    this.accounts$ = combineLatest([
        of(generateAccounts(25)),
        interval(2000).pipe(startWith(0))
      ]).pipe(
        map( ([accounts]) => {
          return this.changeRanAccount(accounts);
        })
      );

    // Dummy change Exchange Rate
    setTimeout(
      () => this.exchangeRate$.next(5200),
      2000
    );
    setTimeout(
      () => this.exchangeRate$.next(13000),
      14000
    );

  }

  getAccount(id: string): Observable<Account> {
    // Find account
    return this.accounts$.pipe(
      map(accounts => {
        const account = accounts.find(account => account.id === id);
        return account;
      })
    );
  }

  // Util
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

  ngOnDestroy() {
    if (this.subject) {
      this.subject.complete();
    }
  }
}