import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-computed-value',
  templateUrl: './computed-value.component.html'
})

export class ComputedValueComponent implements OnChanges {
  @Input() value: number = 0;
  computedValue$: Observable<number>;

  constructor(private dataService: DataService) {
    
  }

  ngOnChanges(changes) {
    this.computedValue$ = this.dataService.exchangeRate$.pipe(
      map((rate: number) => this.value * rate)
    );
  }
}