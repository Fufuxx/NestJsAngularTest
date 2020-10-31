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

  pulse(element: Element, className: string) {
    element.classList.add(className);
    setTimeout(
      () => element.classList.remove(className),
      1500
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appHighlight && changes.appHighlight.currentValue != changes.appHighlight.previousValue) {
      // -> Check if row from Account Table - If not, Account detail text
      const element = this.element.closest('.highlight-element')
        ? this.element.closest('.highlight-element')
        : this.element;
      // -> Class name prefix for row and text
      const classPref = this.element.closest('.highlight-element')
        ? 'highlight-row'
        : 'highlight-text';

      if(changes.appHighlight.currentValue > changes.appHighlight.previousValue) {
        this.pulse(element, classPref + '-plus');
      }
      if(changes.appHighlight.currentValue < changes.appHighlight.previousValue) {
        this.pulse(element, classPref + '-minus');
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