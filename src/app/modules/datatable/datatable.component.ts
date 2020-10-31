import{ Component, Input, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Account } from '../../../../shared/models/account';
import { Transaction } from 'shared/models/transaction';

export class Column {
  label!: string;
  key!: string;
  isSortable: boolean = false;
}

export class DataTable<T> {
  columns!: Column[];
  data: T[];
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html'
})

export class DataTableComponent {
  @Input() dataTable: DataTable<(Account | Transaction)>;
  columns: Column[];
  displayedColumns: string[];
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // -> Columns
    this.columns = this.dataTable.columns;
    this.displayedColumns = this.columns.map((e: Column) => e.label);
    // -> Source
    this.dataSource = new MatTableDataSource(this.dataTable.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
}