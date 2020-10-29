import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { NumberCellModule } from './../number-cell/number-cell.module';

import { DataTableComponent } from './datatable.component';
import { TypeofPipe } from './../../pipes/typeof.pipe';

const MATERIAL_MODULES = [
  MatIconModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  declarations: [
    DataTableComponent,
    TypeofPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NumberCellModule,
    ...MATERIAL_MODULES
  ],
  exports: [DataTableComponent]
})

export class DataTableModule {

}