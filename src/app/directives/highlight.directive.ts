import { CommonModule } from '@angular/common';
import { Directive, OnChanges, Input, SimpleChanges, NgModule, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

  @Input() public appHighlight: number;
  element: HTMLElement;

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appHighlight && changes.appHighlight.currentValue != changes.appHighlight.previousValue) {
      if(changes.appHighlight.currentValue > changes.appHighlight.previousValue) {
        // this.element.parentElement.parentElement.parentElement.classList.add('highlight-plus');
        this.element.closest('tr').classList.add('highlight-plus');
        setTimeout(
          () => this.element.closest('tr').classList.remove('highlight-plus')
          , 1000
        );
      }
      if(changes.appHighlight.currentValue < changes.appHighlight.previousValue) {
        this.element.closest('tr').classList.add('highlight-minus');
        setTimeout(
          () => this.element.closest('tr').classList.remove('highlight-minus')
          , 2000
        );
      }
    }
  } 
}

@NgModule({
  imports: [CommonModule],
  declarations: [HighlightDirective],
  exports: [HighlightDirective],
})
export class HighlightModule {}