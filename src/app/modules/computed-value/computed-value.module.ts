import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComputedValueComponent } from './computed-value.component';

@NgModule({
  declarations: [ComputedValueComponent],
  imports: [CommonModule],
  exports: [ComputedValueComponent]
})

export class ComputedValueModule {

}