import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { asapScheduler, Observable, of, scheduled, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { environment } from './../../environments/environment';
import { Account } from '../../../shared/models/account';

@Injectable({ providedIn: 'root' })
export class DataService implements OnDestroy {
  subject: WebSocketSubject<any>;
  // Set initial value for exchange so highlight will be triggered
  exchangeRate$ = new BehaviorSubject<number>(1000);
  apiRoot = environment.api;

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

    // Dummy change Exchange Rate
    setTimeout(
      () => this.exchangeRate$.next(12345),
      2000
    );

    setTimeout(
      () => this.exchangeRate$.next(100000),
      14000
    );
  }

  getAccounts(): Observable<Account[]> {
    // Setup response structure generic types
    return this.http.get(`${this.apiRoot}/api/accounts`)
      .pipe(map((data: any) => data.accounts));
  }

  getAccount(id: string): Observable<Account> {
    // Setup response structure generic types
    return this.http.get(`${this.apiRoot}/api/account/${id}`)
      .pipe(map((data: any) => data.account));
  }

  ngOnDestroy() {
    if (this.subject) {
      this.subject.complete();
    }
  }
}