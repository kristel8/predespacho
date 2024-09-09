import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private readonly elementRef: ElementRef) { }

  @HostListener('input', ['$event'])
  onChangeInput(event: Event):void {
  const numbersOnly = /[^0-9]*/g;

  const valor = this.elementRef.nativeElement.value;
  this.elementRef.nativeElement.value = valor.replace(numbersOnly, '');

  if ( valor !== this.elementRef.nativeElement.value) {
    event.stopPropagation();
  }
  }
}
