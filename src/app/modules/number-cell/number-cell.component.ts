import { Component, Input, OnChanges } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-number-cell',
  templateUrl:'./number-cell.component.html',
  styles: [`
    :host{ display: block; padding: 5px; }
  `]
})

export class NumberCellComponent implements OnChanges {
  @Input() balance: number;
  computedValue$: Observable<number>;

  constructor(private dataService: DataService) {
    
  }

  ngOnChanges(changes) {
    this.computedValue$ = this.dataService.exchangeRate$.pipe(
      map((rate: number) => this.balance * rate)
    );
  }

}