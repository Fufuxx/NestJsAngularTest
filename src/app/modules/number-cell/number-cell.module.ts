import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightModule } from './../../directives/highlight.directive';

import { NumberCellComponent } from './number-cell.component';

@NgModule({
  declarations: [NumberCellComponent],
  imports: [
    CommonModule,
    HighlightModule
  ],
  exports: [NumberCellComponent]
})

export class NumberCellModule {

}