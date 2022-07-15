import { Directive, HostListener } from '@angular/core';
// todo: jak nie używane wyjebac
@Directive({
  selector: '[appBookItem]',
})
export class BookItemDirective {
  constructor() {}

  @HostListener('mouseenter')
  mouseEnter() {
    // console.log('dziala');
  }
  @HostListener('mouseleave')
  mouseLeave() {
    //console.log('dziala2');
  }
  @HostListener('click')
  mouseLeav2e() {
    //console.log('dziala3');
  }
}
