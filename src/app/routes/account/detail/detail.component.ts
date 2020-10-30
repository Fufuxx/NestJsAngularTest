import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from './../../../services/data.service';
import { Account } from 'shared/models/account';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent {
  account$: Observable<Account>;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.account$ = this.dataService.getAccount(id);
  }

}