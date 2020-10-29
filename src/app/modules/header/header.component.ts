import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  exchangeRate$: Observable<number>;
  routeTitle$: Observable<string>;

  breadCrumbs: any[];
  
  constructor(
    private dataService: DataService, 
    private router: Router,
    private location: Location
  ) {
    this.exchangeRate$ = this.dataService.exchangeRate$;
  }

  ngOnInit() {
    this.routeTitle$ = this.router.events.pipe(
      filter(e => e instanceof ActivationEnd),
      map((e: ActivationEnd) => {
        return e.snapshot.data.title;
      }),
    );

    //Breadcrumbs
    const res = [];
    let trail = '';
    this.location
      .path()
      .split('/')
      .forEach((e) => {
        const name = e === '' ? 'Home' : this.slugToName(e);
        trail += e + '/';
        res.push({
          title: name,
          url: trail,
        });
      });
    this.breadCrumbs = res;
  }

  slugToName(slug: String) {
    const words = slug.split('-');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return words.join(' ');
  }
}