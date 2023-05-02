import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleSubmenu]'
})
export class ToggleSubmenuDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click')
  @HostListener('focusout')
  toggleFunc() {
    let elm = this.el.nativeElement.children[1];
    if (elm.classList.contains("hidden")) {
      elm.classList.remove("hidden")
    } else {
      elm.classList.add("hidden")
    }
  }
}
